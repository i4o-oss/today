import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalOverlay,
} from '@chakra-ui/react';

function AddBlockModal(props): JSX.Element {
	return (
		<Modal isOpen={props.isOpen} onClose={props.onClose} isCentered={true}>
			<ModalOverlay />
			<ModalContent>
				<ModalCloseButton />
				<ModalBody></ModalBody>
			</ModalContent>
		</Modal>
	);
}

export default AddBlockModal;
