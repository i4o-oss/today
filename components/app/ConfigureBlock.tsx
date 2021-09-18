import { useState } from 'react';
import {
	Flex,
	IconButton,
	Input,
	List,
	ListItem,
	Text,
	VStack,
	chakra,
} from '@chakra-ui/react';
import { Source } from '../../lib/utils';
import RSS from '../configuration/RSS';

interface ConfigureBlockProps {
	block: Source;
	onClose: () => void;
}

function ConfigureBlock(props: ConfigureBlockProps): JSX.Element {
	const { block, onClose } = props;

	function saveBlock(data: any) {
		console.log('Block Saved');
		onClose();
	}

	let currentConfigurationBlock = undefined;
	switch (block.id) {
		case 'rss': {
			currentConfigurationBlock = <RSS saveBlock={saveBlock} />;
			break;
		}

		default: {
			console.log('Invalid Block');
			break;
		}
	}

	return <VStack spacing={4}>{currentConfigurationBlock}</VStack>;
}

export default ConfigureBlock;
