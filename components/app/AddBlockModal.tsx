import {
	Flex,
	Grid,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	VStack
} from '@chakra-ui/react';
import {useRef} from "react";

function AddBlockModal(props): JSX.Element {
	const searchBlockFieldRef = useRef();

	return (
		<Modal initialFocusRef={searchBlockFieldRef} isCentered={true} isOpen={props.isOpen} onClose={props.onClose} size='4xl'>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>
					Choose a content block
				</ModalHeader>
				<ModalCloseButton />
				<ModalBody mb={4}>
					<VStack spacing={2}>
						<Input h='16' mb={4} ref={searchBlockFieldRef} />
						<Grid gap={8} templateColumns='repeat(4, 1fr)' w='full'>
							<Flex w='full' h='32' alignItems='center' justifyContent='center' borderStyle='solid' borderWidth={1} borderRadius='lg' cursor='pointer' shadow='md' transition='box-shadow 0.2s ease-in-out' _hover={{ shadow: 'xl' }}>
								RSS
							</Flex>
							<Flex w='full' h='32' alignItems='center' justifyContent='center' borderStyle='solid' borderWidth={1} borderRadius='lg' cursor='pointer' shadow='md' transition='box-shadow 0.2s ease-in-out' _hover={{ shadow: 'xl' }}>
								HackerNews
							</Flex>
							<Flex w='full' h='32' alignItems='center' justifyContent='center' borderStyle='solid' borderWidth={1} borderRadius='lg' cursor='pointer' shadow='md' transition='box-shadow 0.2s ease-in-out' _hover={{ shadow: 'xl' }}>
								Podcasts
							</Flex>
							<Flex w='full' h='32' alignItems='center' justifyContent='center' borderStyle='solid' borderWidth={1} borderRadius='lg' cursor='pointer' shadow='md' transition='box-shadow 0.2s ease-in-out' _hover={{ shadow: 'xl' }}>
								Youtube
							</Flex>
							<Flex w='full' h='32' alignItems='center' justifyContent='center' borderStyle='solid' borderWidth={1} borderRadius='lg' cursor='pointer' shadow='md' transition='box-shadow 0.2s ease-in-out' _hover={{ shadow: 'xl' }}>
								Pocket
							</Flex>
							<Flex w='full' h='32' alignItems='center' justifyContent='center' borderStyle='solid' borderWidth={1} borderRadius='lg' cursor='pointer' shadow='md' transition='box-shadow 0.2s ease-in-out' _hover={{ shadow: 'xl' }}>
								Readwise
							</Flex>
							<Flex w='full' h='32' alignItems='center' justifyContent='center' borderStyle='solid' borderWidth={1} borderRadius='lg' cursor='pointer' shadow='md' transition='box-shadow 0.2s ease-in-out' _hover={{ shadow: 'xl' }}>
								Date
							</Flex>
							<Flex w='full' h='32' alignItems='center' justifyContent='center' borderStyle='solid' borderWidth={1} borderRadius='lg' cursor='pointer' shadow='md' transition='box-shadow 0.2s ease-in-out' _hover={{ shadow: 'xl' }}>
								Weather
							</Flex>
						</Grid>
					</VStack>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}

export default AddBlockModal;
