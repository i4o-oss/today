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
	useDisclosure,
} from '@chakra-ui/react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { IoAddSharp, IoSettingsSharp } from 'react-icons/io5';
import Container from '../components/common/Container';
import Header from '../components/common/Header';
import { reorder } from '../lib/utils';
import AddBlockModal from '../components/app/AddBlockModal';
import FeedSettingsModal from '../components/app/FeedSettingsModal';
import { supabase } from '../lib/supabaseClient';
import DraggableBlocks from '../components/app/DraggableBlocks';

interface NewFeedHeaderProps {
	togglePreview: () => void;
	isSettingsOpen: boolean;
	onSettingsOpen: () => void;
	onSettingsClose: () => void;
	saveFeedSettings: (settings: any) => void;
}

function NewFeedHeader(props: NewFeedHeaderProps): JSX.Element {
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
						onClick={props.onSettingsOpen}
						icon={<IoSettingsSharp />}
						variant='outline'
						aria-label='Feed Settings'
					>
						Settings
					</IconButton>
					<FeedSettingsModal
						isOpen={props.isSettingsOpen}
						onClose={props.onSettingsClose}
						saveFeedSettings={props.saveFeedSettings}
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
	const {
		isOpen: isSettingsOpen,
		onOpen: onSettingsOpen,
		onClose: onSettingsClose,
	} = useDisclosure();
	const [session, setSession] = useState(undefined);
	const [user, setUser] = useState(undefined);
	const [mode, setMode] = useState('edit');
	const [blocks, setBlocks] = useState({});
	const [order, setOrder] = useState([]);
	const [settings, setSettings] = useState({});

	useEffect(() => {
		setUser(supabase.auth.user());

		supabase.auth.onAuthStateChange((event, session) => {
			setSession(session);
		});
	}, []);

	useEffect(() => {
		setSession(supabase.auth.session());
	}, [user]);

	function saveFeedSettings(settings: any) {
		setSettings(settings);
		onSettingsClose();
	}

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
				<NewFeedHeader
					isSettingsOpen={isSettingsOpen}
					onSettingsClose={onSettingsClose}
					onSettingsOpen={onSettingsOpen}
					saveFeedSettings={saveFeedSettings}
					togglePreview={togglePreview}
				/>
				<DragDropContext onDragEnd={onDragEnd}>
					<Droppable droppableId='today'>
						{(provided) => (
							<chakra.div
								w='full'
								maxW='container.lg'
								ref={provided.innerRef}
								{...provided.droppableProps}
							>
								<DraggableBlocks
									blocks={blocks}
									order={order}
								/>
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
