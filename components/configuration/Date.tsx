import { ConfigureBlockProps } from '../../lib/types';
import { Button, Flex, Switch, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';

function Date(props: ConfigureBlockProps): JSX.Element {
	const [showDate, setShowDate] = useState(false);

	function saveDateBlock() {
		const data = {};
		props.saveBlock(data);
	}

	return (
		<VStack w='full' spacing={6}>
			<Flex w='full' alignItems='center' justifyContent='space-between'>
				<Text fontSize='xl'>Show Date</Text>
				<Switch
					d='flex'
					alignItems='center'
					h={12}
					colorScheme='brand'
					onChange={(e) => setShowDate(e.target.checked)}
					defaultChecked={showDate}
					isChecked={showDate}
					size='lg'
				/>
			</Flex>
			<Flex w='full' alignItems='center' justifyContent='end'>
				<Button colorScheme='brand' onClick={saveDateBlock}>
					Save
				</Button>
			</Flex>
		</VStack>
	);
}

export default Date;
