import { useState } from 'react';
import { Button, Flex, Grid, Input, Text, VStack } from '@chakra-ui/react';
import { ConfigureBlockProps } from '../../lib/types';

function Weather(props: ConfigureBlockProps): JSX.Element {
	const [blockTitle, setBlockTitle] = useState('Weather');

	function saveWeatherBlock() {
		const data = {};
		props.saveBlock(data);
	}

	return (
		<VStack w='full' spacing={6}>
			<Grid gap={4} templateColumns='repeat(2, 1fr)' w='full'>
				<Flex w='full' alignItems='center' justifyContent='start'>
					<Text fontSize='lg'>Location</Text>
				</Flex>
				<Flex w='full' alignItems='center' justifyContent='end'>
					<Button>Detect Location</Button>
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
			</Grid>
			<Flex w='full' alignItems='center' justifyContent='end'>
				<Button colorScheme='brand' onClick={saveWeatherBlock}>
					Save
				</Button>
			</Flex>
		</VStack>
	);
}

export default Weather;
