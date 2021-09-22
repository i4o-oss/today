import {
	Flex,
	Heading,
	HStack,
	Image,
	Link,
	Text,
	useColorModeValue,
} from '@chakra-ui/react';
import truncate from 'lodash.truncate';
import { format } from 'date-fns';

interface Article {
	date: string;
	link: string;
	image?: string;
	siteTitle?: string;
	summary: string;
	title: string;
}

export default function Article(props: Article) {
	const { date, link, image, siteTitle, summary, title } = props;

	return (
		<Flex flexDirection='column' py={6}>
			<Link
				isExternal={true}
				href={link}
				_hover={{ textDecoration: 'none' }}
			>
				<Heading as='h4' fontSize='2xl' mb={2}>
					{title}
				</Heading>
			</Link>
			<Text fontSize='xl' mb={2}>
				{truncate(summary, { length: 140 })}
			</Text>
			{siteTitle ? (
				<Flex alignItems='center'>
					{image ? (
						<Image src={image} w='24px' h='24px' mr={2} />
					) : null}
					<Text fontSize='lg'>
						{siteTitle}
						{'  '}&bull;{'  '}
						{format(new Date(date), 'MMM dd')}
					</Text>
				</Flex>
			) : (
				<Text fontSize='lg'>{format(new Date(date), 'MMM dd')}</Text>
			)}
		</Flex>
	);
}
