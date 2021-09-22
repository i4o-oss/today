import nc from 'next-connect';
import FeedParser from 'feedparser';
import fetch from 'node-fetch';
import { endOfDay, getUnixTime, startOfDay } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { convert } from 'html-to-text';
import today from '../../today.config';

export function latestEpisode(req, res) {
	const { filter } = req.query;
	const url = decodeURIComponent(req.query.url);
	const size = req.query.size;
	const episodes = [];
	let podcastMetadata = null;

	fetch(url)
		.then((feed) => {
			const feedparser = new FeedParser();

			feedparser.on('error', function (err) {
				console.log(err);
			});
			feedparser.on('meta', function (meta) {
				podcastMetadata = meta;
			});
			feedparser.on('readable', function () {
				let episode;
				// eslint-disable-next-line no-cond-assign
				while ((episode = this.read())) {
					if (episode) {
						const publishDate = new Date(episode.date);
						const publishDateInLocalTime = utcToZonedTime(
							publishDate,
							today?.timezone
						);
						// eslint-disable-next-line @typescript-eslint/ban-ts-comment
						// @ts-ignore
						episodes.push({
							title: episode.title,
							date: publishDateInLocalTime,
							link: episode.link,
							summary: convert(episode.summary),
						});
					}
				}
			});

			feedparser.on('end', function () {
				const now = utcToZonedTime(new Date(), today?.timezone);
				const todayStart = getUnixTime(startOfDay(now));
				const todayEnd = getUnixTime(endOfDay(now));

				if (filter === 'latest') {
					const latest = episodes.slice(0, size);

					res.status(200).json({
						latest: latest[0],
						meta: podcastMetadata,
					});
				} else if (filter === 'today') {
					const today = episodes.filter((episode) => {
						const postPublishDate = getUnixTime(episode?.date);
						return (
							postPublishDate >= todayStart &&
							postPublishDate <= todayEnd
						);
					});

					res.status(200).json({
						latest: today[0],
						meta: podcastMetadata,
					});
				}
			});

			const response = feed.body;
			response.pipe(feedparser);
		})
		.catch((err) => console.error(err));
}

export default nc({ attachParams: true }).get(latestEpisode);
