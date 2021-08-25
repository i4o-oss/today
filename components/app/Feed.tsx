import { useState } from 'react';
import { chakra, Flex } from '@chakra-ui/react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import RSS from '../blocks/RSS';
import { reorder } from '../../lib/utils';

function Feed() {
	const initial = [
		{
			id: 'a',
			content: 'Card 0',
		},
		{
			id: 'b',
			content: 'Card 1',
		},
		{
			id: 'c',
			content: 'Card 2',
		},
		{
			id: 'd',
			content: 'Card 3',
		},
		{
			id: 'e',
			content: 'Card 4',
		},
		{
			id: 'f',
			content: 'Card 5',
		},
	];
	const [feeds, setFeeds] = useState(initial);

	const onDragEnd = (result) => {
		if (!result.destination) {
			return;
		}

		if (result.destination.index === result.source.index) {
			return;
		}

		const updatedFeeds = reorder(
			feeds,
			result.source.index,
			result.destination.index
		);

		setFeeds(updatedFeeds);
	};

	return (
		<Flex
			w='full'
			maxW='container.lg'
			px={4}
			py={32}
			flexDirection='column'
			alignItems='center'
			justifyContent='start'
			overflow='visible'
		>
			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable droppableId='today'>
					{(provided) => (
						<chakra.div
							w='full'
							maxW='container.lg'
							ref={provided.innerRef}
							{...provided.droppableProps}
						>
							{feeds.map((feed, index) => (
								<RSS
									id={feed.id}
									index={index}
									key={feed.id}
									content={feed.content}
								/>
							))}
							{provided.placeholder}
						</chakra.div>
					)}
				</Droppable>
			</DragDropContext>
		</Flex>
	);
}

export default Feed;
