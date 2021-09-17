import { Flex, Heading, Link, Text, useColorModeValue } from '@chakra-ui/react';
import truncate from 'lodash.truncate';
import { format } from 'date-fns';

interface Article {
	date: string;
	link: string;
	summary: string;
	title: string;
}

export default function Article(props: Article) {
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
				<Heading as='h4' fontSize='xl' mb={2}>
					{title}
				</Heading>
				<Text mb={2}>{truncate(summary, { length: 320 })}</Text>
				<Text>{format(new Date(date), 'MMM dd')}</Text>
			</Flex>
		</Link>
	);
}
