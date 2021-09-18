import { ConfigureBlockProps } from '../../lib/types';
import { Button, Flex, Switch, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';

function YearProgress(props: ConfigureBlockProps): JSX.Element {
	const [showYearProgress, setShowYearProgress] = useState(false);

	function saveYearProgressBlock() {
		const data = {};
		props.saveBlock(data);
	}

	return (
		<VStack w='full' spacing={6}>
			<Flex w='full' alignItems='center' justifyContent='space-between'>
				<Text fontSize='xl'>Show Year Progress</Text>
				<Switch
					d='flex'
					alignItems='center'
					h={12}
					colorScheme='brand'
					onChange={(e) => setShowYearProgress(e.target.checked)}
					defaultChecked={showYearProgress}
					isChecked={showYearProgress}
					size='lg'
				/>
			</Flex>
			<Flex w='full' alignItems='center' justifyContent='end'>
				<Button colorScheme='brand' onClick={saveYearProgressBlock}>
					Save
				</Button>
			</Flex>
		</VStack>
	);
}

export default YearProgress;
