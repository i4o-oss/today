import {
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
} from '@chakra-ui/react';

function FeedSettingsModal(props) {
	return (
		<Modal isOpen={props.isOpen} onClose={props.onClose}>
			<ModalOverlay />
			<ModalContent top='8rem'>
				<ModalHeader>Modal Title</ModalHeader>
				<ModalCloseButton />
				<ModalBody>Test</ModalBody>

				<ModalFooter>
					<Button colorScheme='blue' mr={3} onClick={props.onClose}>
						Close
					</Button>
					<Button variant='ghost'>Secondary Action</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}

export default FeedSettingsModal;
