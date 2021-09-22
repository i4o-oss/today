import { useEffect, useState } from 'react';
import { Divider, Flex, GridItem, Heading, Spinner } from '@chakra-ui/react';
import Article from '../common/Article';

interface HackerNews {
	name: string;
	size: number;
	type: string;
}

export default function HackerNews(props: HackerNews): JSX.Element {
	const { name, size, type } = props;
	const [articles, setArticles] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		async function fetchArticles() {
			const response = await fetch(`/api/hn?type=${type}&size=${size}`);
			const data = await response.json();
			setArticles(data.active);
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

	let HackerNewsBlockElement = null;
	if (isLoading && articles.length === 0) {
		HackerNewsBlockElement = (
			<Flex w='full' p={4} alignItems='center' justifyContent='center'>
				<Spinner />
			</Flex>
		);
	} else if (!isLoading && articles.length > 0) {
		HackerNewsBlockElement = articles.map((article, index) => (
			<Article
				key={index}
				date={article?.date}
				link={article?.link}
				summary=''
				title={article?.title}
			/>
		));
	}

	return (
		<GridItem colSpan={2}>
			<Flex
				w='full'
				flexDirection='column'
				style={{ marginBottom: '8px' }}
			>
				<Heading as='h2' size='xl' fontWeight='semibold' mb={4}>
					{name}
				</Heading>
				{HackerNewsBlockElement}
			</Flex>
			<Divider mb={4} />
		</GridItem>
	);
}
