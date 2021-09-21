import {
	chakra,
	Alert,
	AlertDescription,
	Button,
	CloseButton,
	FormControl,
	Input,
	useColorModeValue,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Formik } from 'formik';

function SubscriptionForm(props) {
	const [loading, setLoading] = useState(false);
	const [waitlistCount, setWaitlistCount] = useState(0);

	async function updateWaitlist(email) {
		const response = await fetch('/api/waitlist', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email }),
		});
		const { data } = await response.json();
		setWaitlistCount(data.number);
	}

	return (
		<>
			<div id='revue-embed'>
				<Formik
					initialValues={{ email: '' }}
					onSubmit={async (values) => {
						setLoading(true);
						await updateWaitlist(values.email);
						setLoading(false);
					}}
				>
					{(formik) => (
						<chakra.form
							w='md'
							d='flex'
							onSubmit={formik.handleSubmit}
						>
							<FormControl w='70%' textAlign='left'>
								<Input
									h={12}
									variant={'solid'}
									color={useColorModeValue(
										'black.100',
										'white.100'
									)}
									_placeholder={{
										color: 'gray.400',
									}}
									border={0}
									bg={useColorModeValue(
										'blackAlpha.100',
										'whiteAlpha.100'
									)}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.email}
									name='email'
									type='email'
									required
									placeholder={'Your Email'}
									aria-label={'Your Email'}
								/>
							</FormControl>
							<FormControl w='30%' ml={4}>
								<Button
									colorScheme='brand'
									h={12}
									w='100%'
									type='submit'
									name='join_waitlist'
									id='join_waitlist'
									loading={loading}
								>
									{props?.cta || 'Subscribe'}
								</Button>
							</FormControl>
						</chakra.form>
					)}
				</Formik>
				<chakra.span
					d='flex'
					justifyContent='center'
					fontSize='xs'
					mt={2}
					textAlign='center'
				>
					Get notified when we launch. No spam. Unsubscribe any time.
				</chakra.span>
			</div>
			{waitlistCount ? (
				<Alert
					d='flex'
					justifyContent='center'
					maxW='container.sm'
					borderRadius='lg'
					mt={4}
					position='relative'
					status='success'
				>
					<AlertDescription
						mr={4}
					>{`Thank you for joining the waitlist! You're currently at #${waitlistCount}`}</AlertDescription>
					<CloseButton
						onClick={() => setWaitlistCount(0)}
						position='absolute'
						right='1rem'
					/>
				</Alert>
			) : null}
		</>
	);
}

export default SubscriptionForm;
