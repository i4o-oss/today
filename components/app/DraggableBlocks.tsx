import { Draggable } from 'react-beautiful-dnd';
import { Flex, IconButton, Text } from '@chakra-ui/react';
import { DragHandleIcon } from '@chakra-ui/icons';

interface DraggableBlocksProps {
	order: string[];
}

function DraggableBlocks(props: DraggableBlocksProps): JSX.Element {
	const { order } = props;

	return (
		<>
			{order.map((id, index) => (
				<Draggable draggableId={id} index={index} key={id}>
					{(provided) => (
						<Flex
							ref={provided.innerRef}
							{...provided.draggableProps}
							w='full'
							h={32}
							alignItems='start'
							justifyContent='start'
							borderWidth={1}
							borderRadius='lg'
							borderStyle='solid'
							position='relative'
							p={4}
							mb={6}
						>
							<Text>{`Block: ${id}`}</Text>
							<IconButton
								variant='ghost'
								{...provided.dragHandleProps}
								position='absolute'
								top={0}
								left='-3rem'
								aria-label='Drag Handle'
								icon={<DragHandleIcon />}
							/>
						</Flex>
					)}
				</Draggable>
			))}
		</>
	);
}

export default DraggableBlocks;
