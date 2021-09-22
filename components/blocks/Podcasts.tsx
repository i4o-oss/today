import { useEffect, useState } from 'react';
import { Divider, Flex, GridItem, Heading, Spinner } from '@chakra-ui/react';
import Article from '../common/Article';

interface Podcasts {
	feeds: string[];
	filter: string;
	size: number;
	title: string;
}

export default function Podcasts(props: Podcasts) {
	const { feeds, filter, size, title } = props;
	const [podcasts, setPodcasts] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		async function fetchPodcasts() {
			const latestArray = await Promise.all(
				feeds.map(async (url) => {
					const encodedUrl = encodeURIComponent(url.toString());
					const response = await fetch(
						`/api/podcasts?url=${encodedUrl}&size=${size}&filter=${filter}`
					);
					const data = await response.json();

					if (data.latest && data.meta) {
						return data;
					}

					return null;
				})
			);

			const podcasts = latestArray.filter((item) => item !== null);
			setPodcasts(podcasts);
		}

		setIsLoading(true);
		fetchPodcasts()
			.then(() => {
				setIsLoading(false);
			})
			.catch((err) => {
				setIsLoading(false);
			});
	}, []);

	let PodcastBlockElement = null;
	if (isLoading && podcasts.length === 0) {
		PodcastBlockElement = (
			<Flex w='full' p={4} alignItems='center' justifyContent='center'>
				<Spinner />
			</Flex>
		);
	} else if (!isLoading && podcasts.length > 0) {
		PodcastBlockElement = podcasts.map((episode, index) => (
			<Article
				key={index}
				date={episode?.latest?.date}
				link={episode?.latest?.link}
				image={episode?.meta?.image?.url}
				siteTitle={episode?.meta?.title}
				summary={episode?.latest?.summary}
				title={episode?.latest?.title}
			/>
		));
	}

	return PodcastBlockElement ? (
		<GridItem colSpan={2}>
			<Flex
				w='full'
				flexDirection='column'
				style={{ marginBottom: '8px' }}
			>
				<Heading as='h2' size='xl' fontWeight='semibold' mb={4}>
					{title}
				</Heading>
				{PodcastBlockElement}
			</Flex>
			<Divider mb={4} />
		</GridItem>
	) : null;
}
