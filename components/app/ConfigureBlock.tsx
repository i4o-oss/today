import { VStack, chakra } from '@chakra-ui/react';
import { Source } from '../../lib/utils';

interface ConfigureBlockProps {
	block: Source;
}

function ConfigureBlock(props: ConfigureBlockProps): JSX.Element {
	return (
		<VStack spacing={2}>
			<chakra.span>{`Configure ${props.block.name}`}</chakra.span>
		</VStack>
	);
}

export default ConfigureBlock;
