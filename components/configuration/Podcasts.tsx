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
	Text,
	VStack,
} from '@chakra-ui/react';
import { IoClose } from 'react-icons/io5';
import { ConfigureBlockProps } from '../../lib/types';

function Podcasts(props: ConfigureBlockProps): JSX.Element {
	const [blockTitle, setBlockTitle] = useState('Podcasts');
	const [podcastUrl, setPodcastUrl] = useState('');
	const [podcasts, setPodcasts] = useState([]);

	function updatePodcastsHandler(e) {
		if (e.keyCode === 13) {
			setPodcasts([...podcasts, podcastUrl]);
			setPodcastUrl('');
		}
	}

	function removePodcastUrl(url) {
		const updatedFeeds = podcasts.filter((feed) => feed !== url);
		setPodcasts(updatedFeeds);
	}

	function savePodcastsBlock() {
		const data = {
			podcasts,
			title: blockTitle,
		};
		props.saveBlock(data);
	}

	return (
		<VStack w='full' spacing={6}>
			<Flex w='full' alignItems='center' justifyContent='start'>
				<Text>
					Add your favorite podcasts, modify the settings to your
					liking and click Save.
				</Text>
			</Flex>
			<VStack w='full' spacing={2}>
				<List w='full'>
					<ListItem>
						<Text fontSize='lg' fontWeight='semibold' mb={2}>
							Favourite Podcasts
						</Text>
					</ListItem>
					{podcasts.map((feed, index) => (
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
								onClick={() => removePodcastUrl(feed)}
							/>
						</ListItem>
					))}
				</List>
				<HStack w='full' mb={4} spacing={2}>
					<Input
						h={12}
						onChange={(e) => setPodcastUrl(e.target.value)}
						onKeyDown={updatePodcastsHandler}
						value={podcastUrl}
					/>
					<Button h={12} px={8} onClick={updatePodcastsHandler}>
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
			</Grid>
			<Flex w='full' alignItems='center' justifyContent='end'>
				<Button colorScheme='brand' onClick={savePodcastsBlock}>
					Save
				</Button>
			</Flex>
		</VStack>
	);
}

export default Podcasts;
