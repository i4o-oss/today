import { GridItem, HStack, Text } from '@chakra-ui/react';

function Weather(): JSX.Element {
	return (
		<GridItem colSpan={1}>
			<HStack
				w='full'
				h='full'
				alignItems='center'
				justifyContent='flex-end'
			>
				<Text fontSize='2xl'>Weather Goes Here</Text>
			</HStack>
		</GridItem>
	);
}

export default Weather;
