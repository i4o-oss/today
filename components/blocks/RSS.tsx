import { chakra } from '@chakra-ui/react';
import { Draggable } from 'react-beautiful-dnd';

function RSS(props) {
	return (
		<Draggable draggableId={props.id} index={props.index}>
			{(provided) => (
				<div
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
				>
					<chakra.div
						bg='tomato'
						w='100%'
						p={4}
						color='white'
						style={{ marginBottom: '8px' }}
					>
						{props.content}
					</chakra.div>
				</div>
			)}
		</Draggable>
	);
}

export default RSS;
