import { useState } from 'react';
import {
	Button,
	Flex,
	Grid,
	HStack,
	IconButton,
	Input,
	List,
	ListItem,
	Select,
	Text,
	VStack,
} from '@chakra-ui/react';
import { IoClose } from 'react-icons/io5';

interface ConfigureRssProps {
	saveBlock: (data: any) => void;
}

function RSS(props: ConfigureRssProps) {
	const [blockTitle, setBlockTitle] = useState('Latest Articles');
	const [feedUrl, setFeedUrl] = useState('');
	const [feeds, setFeeds] = useState([]);
	const [noOfArticles, setNoOfArticles] = useState('1');

	function updateFeedsHandler(e) {
		if (e.keyCode === 13) {
			setFeeds([...feeds, feedUrl]);
			setFeedUrl('');
		}
	}

	function removeFeedUrl(url) {
		const updatedFeeds = feeds.filter((feed) => feed !== url);
		setFeeds(updatedFeeds);
	}

	function saveRssBlock() {
		const data = {
			feeds,
			title: blockTitle,
			size: parseInt(noOfArticles, 10),
		};
		props.saveBlock(data);
	}

	return (
		<VStack w='full' spacing={6}>
			<Flex w='full' alignItems='center' justifyContent='start'>
				<Text>
					Add your favorite RSS feeds, modify the settings to your
					liking and click Save.
				</Text>
			</Flex>
			<VStack w='full' spacing={2}>
				<List w='full'>
					<ListItem>
						<Text fontSize='lg' fontWeight='semibold' mb={2}>
							My feeds
						</Text>
					</ListItem>
					{feeds.map((feed, index) => (
						<ListItem
							w='full'
							d='flex'
							alignItems='center'
							justifyContent='space-between'
							py={2}
							key={index}
						>
							<Text>{feed}</Text>
							<IconButton
								variant='ghost'
								aria-label='Remove feed url'
								icon={<IoClose />}
								p={0}
								onClick={() => removeFeedUrl(feed)}
							/>
						</ListItem>
					))}
				</List>
				<HStack w='full' mb={4} spacing={2}>
					<Input
						h={12}
						onChange={(e) => setFeedUrl(e.target.value)}
						onKeyDown={updateFeedsHandler}
						value={feedUrl}
					/>
					<Button h={12} px={8} onClick={updateFeedsHandler}>
						Add
					</Button>
				</HStack>
			</VStack>
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
					</Select>
				</Flex>
			</Grid>
			<Flex w='full' alignItems='center' justifyContent='end'>
				<Button colorScheme='brand' onClick={saveRssBlock}>
					Save
				</Button>
			</Flex>
		</VStack>
	);
}

export default RSS;
