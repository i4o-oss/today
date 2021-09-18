import { useRef, useState } from 'react';
import Image from 'next/image';
import {
	chakra,
	Flex,
	Grid,
	Heading,
	Icon,
	IconButton,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Text,
	VStack,
	useColorModeValue,
} from '@chakra-ui/react';
import { FaArrowLeft } from 'react-icons/fa';
import ConfigureBlock from './ConfigureBlock';
import { sources } from '../../lib/utils';

interface AddBlockModalProps {
	isOpen: boolean;
	onClose: () => void;
}

function AddBlockModal(props: AddBlockModalProps): JSX.Element {
	const searchBlockFieldRef = useRef();
	const [selectedBlock, setSelectedBlock] = useState(undefined);

	return (
		<Modal
			initialFocusRef={searchBlockFieldRef}
			isCentered={true}
			isOpen={props.isOpen}
			onClose={() => {
				setSelectedBlock(undefined);
				props.onClose();
			}}
			size='4xl'
		>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>
					<Heading as='h2' fontSize='3xl'>
						{selectedBlock?.name ? (
							<Flex alignItems='center' justifyContent='start'>
								<IconButton
									aria-label='Back to content blocks'
									icon={<FaArrowLeft />}
									onClick={() => setSelectedBlock(undefined)}
									p={0}
									mr={4}
									variant='ghost'
								/>
								<Text>{selectedBlock?.name}</Text>
							</Flex>
						) : (
							<Text>Choose a content block</Text>
						)}
					</Heading>
				</ModalHeader>
				<ModalCloseButton />
				<ModalBody mb={4}>
					{selectedBlock ? (
						<ConfigureBlock
							block={selectedBlock}
							onClose={props.onClose}
						/>
					) : (
						<VStack spacing={2}>
							<Input
								d='none'
								h='16'
								mb={4}
								ref={searchBlockFieldRef}
							/>
							<Grid
								gap={8}
								templateColumns='repeat(4, 1fr)'
								w='full'
							>
								{sources.map((source) => (
									<Flex
										key={source.id}
										w='full'
										h='32'
										flexDirection='column'
										alignItems='center'
										justifyContent='center'
										borderStyle='solid'
										borderWidth={1}
										borderRadius='lg'
										cursor='pointer'
										shadow='md'
										transition='box-shadow 0.2s ease-in-out'
										_hover={{ shadow: 'xl' }}
										onClick={() => setSelectedBlock(source)}
									>
										{source.icon ? (
											<Icon
												as={source.icon}
												w={8}
												h={8}
												mb={4}
												color={
													source.color ??
													useColorModeValue(
														'gray.900',
														'gray.100'
													)
												}
											/>
										) : (
											<chakra.span w={8} h={8} mb={4}>
												<Image
													src={source.image}
													width={32}
													height={32}
												/>
											</chakra.span>
										)}
										<Text>{source.name}</Text>
									</Flex>
								))}
							</Grid>
						</VStack>
					)}
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}

export default AddBlockModal;
