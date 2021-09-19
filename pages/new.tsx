import { useEffect, useState } from 'react';
import {
	chakra,
	Button,
	FormControl,
	FormLabel,
	Flex,
	HStack,
	IconButton,
	Input,
	Switch,
	Text,
	useDisclosure,
} from '@chakra-ui/react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { IoAddSharp, IoSettingsSharp } from 'react-icons/io5';
import { DragHandleIcon } from '@chakra-ui/icons';
import Container from '../components/common/Container';
import Header from '../components/common/Header';
import { reorder } from '../lib/utils';
import AddBlockModal from '../components/app/AddBlockModal';
import FeedSettingsModal from '../components/app/FeedSettingsModal';
import { supabase } from '../lib/supabaseClient';

interface NewFeedHeaderProps {
	togglePreview: () => void;
}

function NewFeedHeader(props: NewFeedHeaderProps): JSX.Element {
	const {
		isOpen: isSettingsOpen,
		onOpen: onSettingsOpen,
		onClose: onSettingsClose,
	} = useDisclosure();

	return (
		<Flex justifyContent='space-between' w='full' py={4} mb={8}>
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
						onChange={props.togglePreview}
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
	);
}

interface AddBlockButtonProps {
	isAddBlockOpen: boolean;
	onAddBlockOpen: () => void;
	onAddBlockClose: () => void;
	saveBlock: (blockId: string, blockData: any) => void;
}

function AddBlockButton(props: AddBlockButtonProps): JSX.Element {
	return (
		<Flex
			w='full'
			alignItems='center'
			mt={12}
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
				onClick={props.onAddBlockOpen}
				icon={<IoAddSharp />}
				variant='outline'
				aria-label='Add content block'
			/>
			<AddBlockModal
				isOpen={props.isAddBlockOpen}
				onClose={props.onAddBlockClose}
				saveBlock={props.saveBlock}
			/>
		</Flex>
	);
}

function New(): JSX.Element {
	const {
		isOpen: isAddBlockOpen,
		onOpen: onAddBlockOpen,
		onClose: onAddBlockClose,
	} = useDisclosure();
	const [session, setSession] = useState(undefined);
	const [user, setUser] = useState(undefined);
	const [mode, setMode] = useState('edit');
	const [blocks, setBlocks] = useState({});
	const [order, setOrder] = useState([]);

	useEffect(() => {
		setUser(supabase.auth.user());

		supabase.auth.onAuthStateChange((event, session) => {
			setSession(session);
		});
	}, []);

	useEffect(() => {
		setSession(supabase.auth.session());
	}, [user]);

	function saveBlock(blockId, blockData: any) {
		const updatedBlocks = {
			...blocks,
			[blockId]: blockData,
		};

		setBlocks(updatedBlocks);
		setOrder([...order, blockId]);
		onAddBlockClose();
	}

	const onDragEnd = (result) => {
		if (!result.destination) {
			return;
		}

		if (result.destination.index === result.source.index) {
			return;
		}

		const updatedOrder = reorder(
			order,
			result.source.index,
			result.destination.index
		);

		setOrder(updatedOrder);
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
			<Header session={session} user={user} />
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
				<NewFeedHeader togglePreview={togglePreview} />
				<DragDropContext onDragEnd={onDragEnd}>
					<Droppable droppableId='today'>
						{(provided) => (
							<chakra.div
								w='full'
								maxW='container.lg'
								ref={provided.innerRef}
								{...provided.droppableProps}
							>
								{order.map((id, index) => (
									<Draggable
										draggableId={id}
										index={index}
										key={id}
									>
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
								{provided.placeholder}
								<AddBlockButton
									isAddBlockOpen={isAddBlockOpen}
									onAddBlockOpen={onAddBlockOpen}
									onAddBlockClose={onAddBlockClose}
									saveBlock={saveBlock}
								/>
							</chakra.div>
						)}
					</Droppable>
				</DragDropContext>
			</Flex>
		</Container>
	);
}

export default New;
