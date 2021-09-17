import nc from 'next-connect';
import FeedParser from 'feedparser';
import fetch from 'node-fetch';
import { utcToZonedTime } from 'date-fns-tz';
import { convert } from 'html-to-text';
import today from '../../today.config';

export function latestPost(req, res) {
	const url = decodeURIComponent(req.query.url);
	const size = req.query.size;
	const posts = [];
	// let meta = null;

	fetch(url)
		.then((feed) => {
			const feedparser = new FeedParser();

			feedparser.on('error', function (err) {
				console.log(err);
			});
			// feedparser.on('meta', function(meta) {
			//     console.log(meta);
			// });
			feedparser.on('readable', function () {
				let post;
				// eslint-disable-next-line no-cond-assign
				while ((post = this.read())) {
					if (post) {
						const publishDate = new Date(post.date);
						const publishDateInLocalTime = utcToZonedTime(
							publishDate,
							today?.timezone
						);
						// eslint-disable-next-line @typescript-eslint/ban-ts-comment
						// @ts-ignore
						posts.push({
							title: post.title,
							date: publishDateInLocalTime,
							link: post.link,
							summary: convert(post.summary),
						});
					}
				}
			});

			feedparser.on('end', function () {
				res.status(200).json({ active: posts.slice(0, size) });
			});

			const response = feed.body;
			response.pipe(feedparser);
		})
		.catch((err) => console.error(err));
}

export default nc({ attachParams: true }).get(latestPost);
