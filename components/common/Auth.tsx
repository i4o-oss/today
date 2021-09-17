import { useRef } from 'react';
import {
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	Input,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalBody,
	ModalCloseButton,
	Text,
	VStack,
	chakra,
	useBoolean,
} from '@chakra-ui/react';
import { Field, Formik } from 'formik';
import { supabase } from '../../lib/supabaseClient';

interface AuthModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export default function Auth(props: AuthModalProps): JSX.Element {
	const [loading, setLoading] = useBoolean();
	const emailFieldRef = useRef();
	const { isOpen, onClose } = props;

	const handleSignIn = async ({ email }) => {
		try {
			setLoading.on();
			const { error } = await supabase.auth.signIn({ email });
			if (error) throw error;
			alert('Check your email for the login link!');
		} catch (error) {
			alert(error.error_description || error.message);
		} finally {
			setLoading.off();
		}
	};

	return (
		<Modal
			initialFocusRef={emailFieldRef}
			isCentered={true}
			isOpen={isOpen}
			onClose={onClose}
		>
			<ModalOverlay />
			<ModalContent>
				<ModalCloseButton />
				<ModalBody>
					<VStack py={6} spacing={2}>
						<VStack mb={4} spacing={2}>
							<Heading as='h2' fontSize='2xl'>
								Log In/Sign Up
							</Heading>
							<Text mb={6}>Sign in via magic link</Text>
						</VStack>
						<Formik
							initialValues={{ email: '' }}
							onSubmit={handleSignIn}
						>
							{(props) => (
								<chakra.form
									w='full'
									onSubmit={props.handleSubmit}
								>
									<Field name='email'>
										{({ field, form }) => (
											<FormControl>
												<FormLabel htmlFor='email'>
													Email address
												</FormLabel>
												<Input
													{...field}
													h='12'
													id='email'
													ref={emailFieldRef}
													type='email'
												/>
												<FormErrorMessage>
													{form.errors.email}
												</FormErrorMessage>
											</FormControl>
										)}
									</Field>
									<FormControl>
										<Button
											w='full'
											h='12'
											mt={4}
											colorScheme='brand'
											isLoading={loading}
											type='submit'
										>
											Sign In
										</Button>
									</FormControl>
								</chakra.form>
							)}
						</Formik>
					</VStack>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}
