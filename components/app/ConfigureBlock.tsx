import { VStack } from '@chakra-ui/react';
import { Source } from '../../lib/types';
import RSS from '../configuration/RSS';
import Podcasts from '../configuration/Podcasts';

interface ConfigureBlockProps {
	block: Source;
	onClose: () => void;
}

function ConfigureBlock(props: ConfigureBlockProps): JSX.Element {
	const { block, onClose } = props;

	function saveBlock(data: any) {
		console.log('Block Saved');
		console.log(data);
		onClose();
	}

	let currentConfigurationBlock = undefined;
	switch (block.id) {
		case 'rss': {
			currentConfigurationBlock = <RSS saveBlock={saveBlock} />;
			break;
		}

		case 'podcasts': {
			currentConfigurationBlock = <Podcasts saveBlock={saveBlock} />;
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
