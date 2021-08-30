import { useState } from 'react';
import {
	chakra,
	Button,
	FormControl,
	FormLabel,
	Flex,
	HStack,
	IconButton,
	Input,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Switch,
	useDisclosure,
} from '@chakra-ui/react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { IoAddSharp, IoSettingsSharp } from 'react-icons/io5';
import Container from '../components/common/Container';
import Header from '../components/common/Header';
import { reorder } from '../lib/utils';
// import RSS from '../components/blocks/RSS';
import AddBlockModal from '../components/app/AddBlockModal';
import FeedSettingsModal from '../components/app/FeedSettingsModal';

function New() {
	const {
		isOpen: isSettingsOpen,
		onOpen: onSettingsOpen,
		onClose: onSettingsClose,
	} = useDisclosure();
	const {
		isOpen: isAddBlockOpen,
		onOpen: onAddBlockOpen,
		onClose: onAddBlockClose,
	} = useDisclosure();
	const [mode, setMode] = useState('edit');
	const [blocks, setBlocks] = useState([]);

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

		setBlocks(updatedFeeds);
	};

	const togglePreview = () => {
		if (mode === 'edit') {
			setMode('preview');
		} else {
			setMode('edit');
		}
	};

	return (
		<Container height='100vh'>
			<Header />
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
				<Flex justifyContent='space-between' w='full' py={4}>
					<Input
						variant='unstyled'
						placeholder='Enter feed title'
						fontSize='4xl'
						p={0}
					/>
					<HStack
						d='flex'
						alignItems='center'
						justifyContent='flex-end'
						spacing={4}
					>
						<FormControl
							hidden={true}
							w='auto'
							display='inline-flex'
							alignItems='center'
						>
							<FormLabel htmlFor='preview' mb='0'>
								Preview
							</FormLabel>
							<Switch
								id='preview'
								onChange={togglePreview}
								size='md'
							/>
						</FormControl>
						<>
							<IconButton
								borderColor='gray.400'
								borderWidth={2}
								color='gray.400'
								p={0}
								onClick={onSettingsOpen}
								icon={<IoSettingsSharp />}
								variant='outline'
								aria-label='Feed Settings'
							>
								Settings
							</IconButton>
							<FeedSettingsModal
								isOpen={isSettingsOpen}
								onClose={onSettingsClose}
							/>
						</>
						<Button colorScheme='brand'>Publish</Button>
					</HStack>
				</Flex>

				<DragDropContext onDragEnd={onDragEnd}>
					<Droppable droppableId='today'>
						{(provided) => (
							<chakra.div
								w='full'
								maxW='container.lg'
								ref={provided.innerRef}
								{...provided.droppableProps}
							>
								{blocks.map((block, index) => (
									<>
										<div>Block</div>
									</>
								))}
								<Flex
									w='full'
									alignItems='center'
									my={4}
									_before={{
										position: 'relative',
										top: '50%',
										width: '50%',
										borderTop: '1px solid',
										borderTopColor: 'inherit',
										transform: 'translateY(50%)',
										content: '""',
									}}
									_after={{
										position: 'relative',
										top: '50%',
										width: '50%',
										borderTop: '1px solid',
										borderTopColor: 'inherit',
										transform: 'translateY(50%)',
										content: '""',
									}}
								>
									<IconButton
										borderColor='gray.400'
										borderWidth={1}
										borderRadius='full'
										color='gray.400'
										fontSize='2xl'
										mx={4}
										p={0}
										onClick={onAddBlockOpen}
										icon={<IoAddSharp />}
										variant='outline'
										aria-label='Feed Settings'
									>
										Settings
									</IconButton>
									<AddBlockModal
										isOpen={isAddBlockOpen}
										onClose={onAddBlockClose}
									/>
								</Flex>
								{provided.placeholder}
							</chakra.div>
						)}
					</Droppable>
				</DragDropContext>
			</Flex>
		</Container>
	);
}

export default New;
