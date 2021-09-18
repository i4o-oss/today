import { ConfigureBlockProps } from '../../lib/types';
import {
	Button,
	Flex,
	Grid,
	Input,
	Select,
	Text,
	VStack,
} from '@chakra-ui/react';
import { useState } from 'react';

function Dev(props: ConfigureBlockProps): JSX.Element {
	const [blockTitle, setBlockTitle] = useState('Dev.to');
	const [noOfArticles, setNoOfArticles] = useState('1');
	const [devApiToken, setDevApiToken] = useState('');
	const [devFeedType, setDevFeedType] = useState('top');

	function saveDevBlock() {
		const data = {};
		props.saveBlock(data);
	}

	return (
		<VStack w='full' spacing={6}>
			<Grid gap={4} templateColumns='repeat(2, 1fr)' w='full'>
				<Flex w='full' alignItems='center' justifyContent='start'>
					<Text fontSize='lg'>Connect your Dev.to account</Text>
				</Flex>
				<Flex
					w='full'
					alignItems='center'
					justifyContent='space-between'
				>
					<Input
						h={12}
						onChange={(e) => setDevApiToken(e.target.value)}
						type='password'
						value={devApiToken}
					/>
				</Flex>
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
					<Text fontSize='lg'>Articles List Type</Text>
				</Flex>
				<Flex
					w='full'
					alignItems='center'
					justifyContent='space-between'
				>
					<Select
						h={12}
						onChange={(e) => setDevFeedType(e.target.value)}
						value={devFeedType}
					>
						<option value='top'>Top Articles</option>
						<option value='rising'>Trending</option>
						<option value='fresh'>New</option>
					</Select>
				</Flex>
				<Flex
					w='full'
					alignItems='center'
					justifyContent='space-between'
				>
					<Text fontSize='lg'># of Saved Articles</Text>
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
					</Select>
				</Flex>
			</Grid>
			<Flex w='full' alignItems='center' justifyContent='end'>
				<Button colorScheme='brand' onClick={saveDevBlock}>
					Save
				</Button>
			</Flex>
		</VStack>
	);
}

export default Dev;
