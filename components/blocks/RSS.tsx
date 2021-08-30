import { useEffect, useState } from 'react';
import {
	Flex,
	GridItem,
	Heading,
	Link,
	Spinner,
	Text,
	useColorModeValue,
} from '@chakra-ui/react';
import Article from "../common/Article";
// import { Draggable } from 'react-beautiful-dnd';

interface RSS {
	block: string;
	feeds: string[];
	index: number;
	name: string;
	size: number;
}

export default function RSS(props: RSS) {
	const { block, feeds, index, name, size } = props;
	const [articles, setArticles] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		async function fetchArticles() {
			const latestArray = await Promise.all(
				feeds.map(async (url) => {
					const encodedUrl = encodeURIComponent(url.toString());
					const response = await fetch(`/api/rss?url=${encodedUrl}&size=${size}`);
					const data = await response.json();

					if (data.latest) {
						return data.latest;
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

	let BlockElement = null;
	if (isLoading && articles.length === 0) {
		BlockElement = (
			<Flex w='full' p={4} alignItems='center' justifyContent='center'>
				<Spinner />
			</Flex>
		);
	} else if (!isLoading && articles.length > 0) {
		BlockElement = (
			<>
				<Heading as='h2' size='xl' fontWeight='semibold' mb={4}>
					{name}
				</Heading>
				{articles.map((article, index) => (
					<Article
						key={index}
						date={article?.date}
						link={article?.link}
						summary={article?.summary}
						title={article?.title}
					/>
				))}
			</>
		);
	}

	return (
		<GridItem colSpan={2}>
			<Flex w='full' flexDirection='column' style={{ marginBottom: '8px' }}>
				{BlockElement}
			</Flex>
		</GridItem>
	);
}
