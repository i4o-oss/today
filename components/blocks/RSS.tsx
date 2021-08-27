import { useEffect, useState } from 'react';
import {
	Flex,
	GridItem,
	Heading,
	Link,
	Spinner,
	useColorModeValue,
} from '@chakra-ui/react';
import { Draggable } from 'react-beautiful-dnd';
import truncate from 'lodash.truncate';

interface RSS {
	block: string;
	feeds: string[];
	index: number;
	name: string;
	size: number;
}

function RSS(props: RSS) {
	const { block, feeds, index, name, size } = props;
	const [articles, setArticles] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		async function fetchArticles() {
			const latestArray = await Promise.all(
				feeds.map(async (url) => {
					const response = await fetch(
						`/api/rss?url=${encodeURIComponent(
							url.toString()
						)}&size=${size}`
					);
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
			<Flex w='full' py={4} style={{ marginBottom: '8px' }}>
				{BlockElement}
			</Flex>
		</GridItem>
	);
}

interface Article {
	date: string;
	link: string;
	summary: string;
	title: string;
}

function Article(props: Article) {
	const { date, link, summary, title } = props;

	return (
		<Link isExternal={true} href={link} _hover={{ textDecoration: 'none' }}>
			<Flex
				flexDirection='column'
				p={6}
				mb={4}
				borderWidth={1}
				borderStyle='solid'
				borderColor={useColorModeValue('gray.600', 'gray.400')}
				borderRadius='lg'
			>
				<Heading as='h4' fontSize='xl' mb={4}>
					{title}
				</Heading>
				<span>{truncate(summary, { length: 280 })}</span>
				<span>{date}</span>
			</Flex>
		</Link>
	);
}

export default RSS;
