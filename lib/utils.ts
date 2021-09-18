import {
	FaRss,
	FaHackerNews,
	FaPodcast,
	FaYoutube,
	FaGetPocket,
	FaCalendarDay,
	FaCloudSunRain,
	FaClock,
	FaTwitter,
} from 'react-icons/fa';
import { SiTodoist } from 'react-icons/si';
import { Source } from './types';

export function reorder(list, startIndex, endIndex) {
	const result = [...list];
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);

	return result;
}

export const sources: Source[] = [
	{
		id: 'rss',
		color: '#ee802f',
		icon: FaRss,
		name: 'RSS',
	},
	{
		id: 'hn',
		color: '#ff6600',
		icon: FaHackerNews,
		name: 'Hacker News',
	},
	{
		id: 'podcasts',
		color: '#b150e2',
		icon: FaPodcast,
		name: 'Podcasts',
	},
	{
		id: 'youtube',
		color: '#c4302b',
		icon: FaYoutube,
		name: 'Youtube',
	},
	{
		id: 'pocket',
		color: '#ee4056',
		icon: FaGetPocket,
		name: 'Pocket',
	},
	{
		id: 'readwise',
		image: '/assets/icons/readwise.png',
		name: 'Readwise',
	},
	{
		id: 'date',
		color: '#2cb67d',
		icon: FaCalendarDay,
		name: 'Date',
	},
	{
		id: 'weather',
		color: '#D38E10',
		icon: FaCloudSunRain,
		name: 'Weather',
	},
	{
		id: 'twitter-list',
		color: '#00acee',
		icon: FaTwitter,
		name: 'Twitter Lists',
	},
	{
		id: 'hashnode',
		image: '/assets/icons/hashnode.png',
		name: 'Hashnode',
	},
	{
		id: 'year-progress',
		color: '#ffa879',
		icon: FaClock,
		name: 'Year Progress',
	},
	{
		id: 'todoist',
		color: '#e44232',
		icon: SiTodoist,
		name: 'Todoist',
	},
];
