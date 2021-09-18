import {
	Button,
	Flex,
	Grid,
	Input,
	Select,
	Text,
	VStack,
} from '@chakra-ui/react';
import { ConfigureBlockProps } from '../../lib/types';
import { useState } from 'react';

function HackerNews(props: ConfigureBlockProps): JSX.Element {
	const [blockTitle, setBlockTitle] = useState('Hacker News');
	const [hnFeedType, setHnFeedType] = useState('active');
	const [noOfArticles, setNoOfArticles] = useState('1');

	function saveHackerNewsBlock() {
		const data = {
			type: hnFeedType,
			title: blockTitle,
			size: parseInt(noOfArticles, 10),
		};
		props.saveBlock(data);
	}

	return (
		<VStack w='full' spacing={6}>
			<Grid gap={4} templateColumns='repeat(2, 1fr)' w='full'>
				<Flex
					w='full'
					alignItems='center'
					justifyContent='space-between'
				>
					<Text fontSize='lg'>Block Title</Text>
				</Flex>
				<Flex
					w='full'
					alignItems='center'
					justifyContent='space-between'
				>
					<Input
						h={12}
						onChange={(e) => setBlockTitle(e.target.value)}
						value={blockTitle}
					/>
				</Flex>
				<Flex
					w='full'
					alignItems='center'
					justifyContent='space-between'
				>
					<Text fontSize='lg'>Hacker News Posts Type</Text>
				</Flex>
				<Flex
					w='full'
					alignItems='center'
					justifyContent='space-between'
				>
					<Select
						h={12}
						onChange={(e) => setHnFeedType(e.target.value)}
						value={hnFeedType}
					>
						<option value='active'>Most Active</option>
						<option value='best'>Most Upvoted</option>
						<option value='show'>Show HN</option>
						<option value='newest'>Newest</option>
					</Select>
				</Flex>
				<Flex
					w='full'
					alignItems='center'
					justifyContent='space-between'
				>
					<Text fontSize='lg'># of articles for each feed</Text>
				</Flex>
				<Flex
					w='full'
					alignItems='center'
					justifyContent='space-between'
				>
					<Select
						h={12}
						onChange={(e) => setNoOfArticles(e.target.value)}
						value={noOfArticles}
					>
						<option value='1'>1</option>
						<option value='2'>2</option>
						<option value='3'>3</option>
						<option value='4'>4</option>
						<option value='5'>5</option>
						<option value='6'>6</option>
					</Select>
				</Flex>
			</Grid>
			<Flex w='full' alignItems='center' justifyContent='end'>
				<Button colorScheme='brand' onClick={saveHackerNewsBlock}>
					Save
				</Button>
			</Flex>
		</VStack>
	);
}

export default HackerNews;
