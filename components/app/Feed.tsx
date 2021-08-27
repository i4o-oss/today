import { Flex, Grid, Heading } from '@chakra-ui/react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import RSS from '../blocks/RSS';
import { reorder } from '../../lib/utils';
import today from '../../today.config';
import TodayDate from '../blocks/TodayDate';
import Weather from '../blocks/Weather';

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
			<Heading as='h1' fontSize='8xl' fontWeight='thin' mb={16}>
				Today
			</Heading>
			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable droppableId='today'>
					{(provided) => (
						<Grid
							gap={4}
							maxW='container.lg'
							templateColumns='repeat(2, 1fr)'
							w='full'
							ref={provided.innerRef}
							{...provided.droppableProps}
						>
							{blocks.map((block, index) => {
								switch (block) {
									case 'date': {
										return <TodayDate key={index} />;
									}

									case 'weather': {
										return <Weather key={index} />;
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
						</Grid>
					)}
				</Droppable>
			</DragDropContext>
		</Flex>
	);
}

export default Feed;
