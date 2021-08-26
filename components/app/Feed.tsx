import { chakra, Flex, Heading } from '@chakra-ui/react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import RSS from '../blocks/RSS';
import { reorder } from '../../lib/utils';
import today from '../../today.config';

interface Feed {
	blocks: string[];
	updateBlocks: (order: string[]) => void;
}

function Feed(props: Feed): JSX.Element {
	const { blocks, updateBlocks } = props;

	const onDragEnd = (result) => {
		if (!result.destination) {
			return;
		}

		if (result.destination.index === result.source.index) {
			return;
		}

		const updatedFeeds = reorder(
			blocks,
			result.source.index,
			result.destination.index
		);

		updateBlocks(updatedFeeds);
	};

	return (
		<Flex
			w='full'
			maxW='container.lg'
			py={32}
			flexDirection='column'
			alignItems='start'
			justifyContent='start'
			overflow='visible'
		>
			<Heading as='h1' size='4xl' mb={16}>
				Today
			</Heading>
			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable droppableId='today'>
					{(provided) => (
						<chakra.div
							w='full'
							maxW='container.lg'
							ref={provided.innerRef}
							{...provided.droppableProps}
						>
							{blocks.map((block, index) => {
								switch (block) {
									case 'date': {
										break;
									}

									case 'weather': {
										break;
									}

									case 'rss': {
										const { rss } = today?.blocks;
										const { feeds, name, size } = rss;
										return (
											<RSS
												block={block}
												feeds={feeds}
												key={index}
												index={index}
												name={name}
												size={size}
											/>
										);
									}

									case 'hackernews': {
										break;
									}
								}
							})}
							{provided.placeholder}
						</chakra.div>
					)}
				</Droppable>
			</DragDropContext>
		</Flex>
	);
}

export default Feed;
