import nc from 'next-connect';
import FeedParser from 'feedparser';
import fetch from 'node-fetch';
import { endOfDay, getUnixTime, startOfDay } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { convert } from 'html-to-text';
import today from '../../today.config';

export function latestPost(req, res) {
	const { filter } = req.query;
	const size = parseInt(req.query.size, 10);
	const url = decodeURIComponent(req.query.url);
	const posts = [];
	let siteMetadata = null;

	fetch(url)
		.then((feed) => {
			const feedparser = new FeedParser();

			feedparser.on('error', function (err) {
				console.log(err);
			});
			feedparser.on('meta', function (meta) {
				siteMetadata = meta;
			});
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
							date: publishDateInLocalTime,
							cover: post.image.url,
							link: post.link,
							summary: convert(post.summary),
							title: post.title,
						});
					}
				}
			});

			feedparser.on('end', function () {
				const now = utcToZonedTime(new Date(), today?.timezone);
				const todayStart = getUnixTime(startOfDay(now));
				const todayEnd = getUnixTime(endOfDay(now));

				if (filter === 'latest') {
					const latest = posts.slice(0, size);

					res.status(200).json({
						latest: latest[0],
						meta: siteMetadata,
					});
				} else if (filter === 'today') {
					const today = posts.filter((post) => {
						const postPublishDate = getUnixTime(post?.date);
						return (
							postPublishDate >= todayStart &&
							postPublishDate <= todayEnd
						);
					});

					res.status(200).json({
						latest: today[0],
						meta: siteMetadata,
					});
				}
			});

			const response = feed.body;
			response.pipe(feedparser);
		})
		.catch((err) => console.error(err));
}

export default nc({ attachParams: true }).get(latestPost);
