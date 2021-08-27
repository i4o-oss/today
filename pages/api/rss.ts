import nc from 'next-connect';
import FeedParser from 'feedparser';
import fetch from "node-fetch";
import { endOfDay, getUnixTime, startOfDay } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { convert } from 'html-to-text';
import today from '../../today.config';

export function latestPost(req, res) {
    const url = decodeURIComponent(req.query.url);
    const posts = [];
    let meta = null;

    fetch(url)
        .then(feed => {
            const feedparser = new FeedParser();

            feedparser.on('error', function(err) {
                console.log(err);
            });
            // feedparser.on('meta', function(meta) {
            //     console.log(meta);
            // });
            feedparser.on('readable', function() {
                let post;
                while(post = this.read()) {
                    if (post) {
                        const publishDate = new Date(post.date);
                        const publishDateInLocalTime = utcToZonedTime(publishDate, today?.timezone);
                        // @ts-ignore
                        posts.push({
                            title: post.title,
                            date: publishDateInLocalTime,
                            link: post.link,
                            summary: convert(post.summary)
                        });
                    }
                }
            })

            feedparser.on('end', function() {
                const now = utcToZonedTime(new Date(), today?.timezone);
                const todayStart = getUnixTime(startOfDay(now));
                const todayEnd = getUnixTime(endOfDay(now));

                const latest = posts.filter(post => {
                    const postPublishDate = getUnixTime(post?.date);
                    return postPublishDate >= todayStart && postPublishDate <= todayEnd;
                });

                res.status(200).json({ latest: latest[0] });
            });

            const response = feed.body;
            response.pipe(feedparser);
        })
        .catch(err => console.error(err));
}

export default nc({ attachParams: true }).get(latestPost);