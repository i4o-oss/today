import { useEffect, useState } from 'react';
import { Divider, Flex, GridItem, Heading, Spinner } from '@chakra-ui/react';
import Article from '../common/Article';

interface RSS {
	feeds: string[];
	filter: string;
	size: number;
	title: string;
}

export default function RSS(props: RSS) {
	const { feeds, filter, size, title } = props;
	const [articles, setArticles] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		async function fetchArticles() {
			const latestArray = await Promise.all(
				feeds.map(async (url) => {
					const encodedUrl = encodeURIComponent(url.toString());
					const response = await fetch(
						`/api/rss?url=${encodedUrl}&size=${size}&filter=${filter}`
					);
					const data = await response.json();

					if (data.latest && data.meta) {
						return data;
					}

					return null;
				})
			);

			const articles = latestArray.filter((item) => item !== null);
			setArticles(articles);
		}

		setIsLoading(true);
		fetchArticles()
			.then(() => {
				setIsLoading(false);
			})
			.catch((err) => {
				setIsLoading(false);
			});
	}, []);

	let RssBlockElement = null;
	if (isLoading && articles.length === 0) {
		RssBlockElement = (
			<Flex w='full' p={4} alignItems='center' justifyContent='center'>
				<Spinner />
			</Flex>
		);
	} else if (!isLoading && articles.length > 0) {
		RssBlockElement = articles.map((article, index) => (
			<Article
				key={index}
				date={article?.latest?.date}
				link={article?.latest?.link}
				image={article?.cover ?? article?.meta?.image?.url}
				siteTitle={article?.meta?.title}
				summary={article?.latest?.summary}
				title={article?.latest?.title}
			/>
		));
	}

	return RssBlockElement ? (
		<GridItem colSpan={2}>
			<Flex
				w='full'
				flexDirection='column'
				style={{ marginBottom: '8px' }}
			>
				<Heading as='h2' size='xl' fontWeight='semibold' mb={4}>
					{title}
				</Heading>
				{RssBlockElement}
			</Flex>
			<Divider mb={4} />
		</GridItem>
	) : null;
}
