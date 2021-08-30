import { Flex, Grid, Heading } from '@chakra-ui/react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import TodayDate from '../blocks/TodayDate';
import Weather from '../blocks/Weather';
import RSS from '../blocks/RSS';
import HackerNews from "../blocks/HackerNews";
import today from '../../today.config';

interface Feed {
	blocks: string[];
	updateBlocks: (order: string[]) => void;
}

function Feed(props: Feed): JSX.Element {
	const { blocks } = props;

	return (
		<Flex
			w='full'
			maxW='container.lg'
			py={16}
			flexDirection='column'
			alignItems='start'
			justifyContent='start'
			overflow='visible'
		>
			<Heading as='h1' fontSize='8xl' fontWeight='thin' mb={16}>
				Today
			</Heading>
			<Grid
				gap={4}
				maxW='container.lg'
				templateColumns='repeat(2, 1fr)'
				w='full'
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
							const { hackernews } = today?.blocks;
							const { name, size, url } = hackernews;
							return (
								<HackerNews key={index} name={name} size={size} url={url} />
							);
						}
					}
				})}
			</Grid>
		</Flex>
	);
}

export default Feed;
