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

function Readwise(props: ConfigureBlockProps): JSX.Element {
	const [blockTitle, setBlockTitle] = useState('Readwise Highlights');
	const [noOfHighlights, setNoOfHighlights] = useState('1');
	const [readwiseAccessToken, setReadwiseAccessToken] = useState('');

	function saveReadwiseBlock() {
		const data = {};
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
					<Text fontSize='lg'>Readwise Access Token</Text>
				</Flex>
				<Flex
					w='full'
					alignItems='center'
					justifyContent='space-between'
				>
					<Input
						h={12}
						onChange={(e) => setReadwiseAccessToken(e.target.value)}
						type='password'
						value={readwiseAccessToken}
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
					<Text fontSize='lg'># of Highlights</Text>
				</Flex>
				<Flex
					w='full'
					alignItems='center'
					justifyContent='space-between'
				>
					<Select
						h={12}
						onChange={(e) => setNoOfHighlights(e.target.value)}
						value={noOfHighlights}
					>
						<option value='1'>1</option>
						<option value='2'>2</option>
						<option value='3'>3</option>
						<option value='4'>4</option>
					</Select>
				</Flex>
			</Grid>
			<Flex w='full' alignItems='center' justifyContent='end'>
				<Button colorScheme='brand' onClick={saveReadwiseBlock}>
					Save
				</Button>
			</Flex>
		</VStack>
	);
}

export default Readwise;
