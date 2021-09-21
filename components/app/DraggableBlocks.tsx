import { Draggable } from 'react-beautiful-dnd';
import { Flex, Grid, IconButton, Text } from '@chakra-ui/react';
import { DragHandleIcon } from '@chakra-ui/icons';
import RSS from '../blocks/RSS';
import HackerNews from '../blocks/HackerNews';
import Podcasts from '../blocks/Podcasts';
import TodayDate from '../blocks/TodayDate';
import Weather from '../blocks/Weather';

interface DraggableBlocksProps {
	blocks: any;
	order: string[];
}

function DraggableBlocks(props: DraggableBlocksProps): JSX.Element {
	const { order, blocks } = props;

	return (
		<>
			{order.map((id, index) => {
				const block = blocks[id];

				let blockComponent = undefined;
				switch (id) {
					case 'rss': {
						blockComponent = (
							<RSS
								feeds={block.feeds}
								filter='latest'
								size={block.size}
								title={block.title}
							/>
						);
						break;
					}

					case 'podcasts': {
						blockComponent = (
							<Podcasts
								feeds={block.feeds}
								title={block.title}
								size={block.size}
							/>
						);
						break;
					}

					case 'date': {
						blockComponent = <TodayDate />;
						break;
					}

					case 'weather': {
						blockComponent = <Weather />;
						break;
					}

					case 'dev': {
						break;
					}

					case 'hn': {
						blockComponent = (
							<HackerNews
								name={block.title}
								size={block.size}
								type={block.type}
							/>
						);
						break;
					}
				}

				return (
					<Draggable draggableId={id} index={index} key={id}>
						{(provided) => (
							<Flex
								ref={provided.innerRef}
								{...provided.draggableProps}
								w='full'
								h='auto'
								flexDirection='column'
								alignItems='start'
								justifyContent='start'
								position='relative'
								mb={6}
							>
								<Grid w='full' templateColumns='repeat(2, 1fr)'>
									{blockComponent}
								</Grid>
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
				);
			})}
		</>
	);
}

export default DraggableBlocks;
