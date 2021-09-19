import { useState } from 'react';
import {
	Button,
	Flex,
	Grid,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Select,
	Text,
} from '@chakra-ui/react';

interface FeedSettingsProps {
	isOpen: boolean;
	onClose: () => void;
	saveFeedSettings: (settings: any) => void;
}

function FeedSettingsModal(props: FeedSettingsProps) {
	const [schedule, setSchedule] = useState('daily');
	const [day, setDay] = useState('sunday');
	const [hour, setHour] = useState('00');
	const [minutes, setMinutes] = useState('00');

	return (
		<Modal
			isCentered={true}
			isOpen={props.isOpen}
			onClose={props.onClose}
			size='xl'
		>
			<ModalOverlay />
			<ModalContent top='8rem'>
				<ModalHeader>Feed Settings</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Grid gap={4} templateColumns='repeat(2, 1fr)' w='full'>
						<Flex
							w='full'
							alignItems='center'
							justifyContent='space-between'
						>
							<Text fontSize='lg'>Schedule</Text>
						</Flex>
						<Flex
							w='full'
							alignItems='center'
							justifyContent='space-between'
						>
							<Select
								h={12}
								onChange={(e) => setSchedule(e.target.value)}
								value={schedule}
							>
								<option value='daily'>Daily</option>
								<option value='weekly'>Weekly</option>
							</Select>
						</Flex>
						{schedule === 'weekly' ? (
							<>
								<Flex
									w='full'
									alignItems='center'
									justifyContent='space-between'
								>
									<Text fontSize='lg'>Day</Text>
								</Flex>
								<Flex
									w='full'
									alignItems='center'
									justifyContent='space-between'
								>
									<Select
										h={12}
										onChange={(e) => setDay(e.target.value)}
										value={day}
									>
										<option value='sunday'>Sunday</option>
										<option value='monday'>Monday</option>
										<option value='tuesday'>Tuesday</option>
										<option value='wednesday'>
											Wednesday
										</option>
										<option value='thursday'>
											Thursday
										</option>
										<option value='friday'>Friday</option>
										<option value='saturday'>
											Saturday
										</option>
									</Select>
								</Flex>
							</>
						) : null}
						<Flex
							w='full'
							alignItems='center'
							justifyContent='space-between'
						>
							<Text fontSize='lg'>Time</Text>
						</Flex>
						<Grid gap={4} templateColumns='repeat(2, 1fr)' w='full'>
							<Select
								w='full'
								h={12}
								onChange={(e) => setHour(e.target.value)}
								value={hour}
							>
								<option value='00'>00</option>
								<option value='01'>01</option>
								<option value='02'>02</option>
								<option value='03'>03</option>
								<option value='04'>04</option>
								<option value='05'>05</option>
								<option value='06'>06</option>
								<option value='07'>07</option>
								<option value='08'>08</option>
								<option value='09'>09</option>
								<option value='10'>10</option>
								<option value='11'>11</option>
								<option value='12'>12</option>
								<option value='13'>13</option>
								<option value='14'>14</option>
								<option value='15'>15</option>
								<option value='16'>16</option>
								<option value='17'>17</option>
								<option value='18'>18</option>
								<option value='19'>19</option>
								<option value='20'>20</option>
								<option value='21'>21</option>
								<option value='22'>22</option>
								<option value='23'>23</option>
							</Select>
							<Select
								w='full'
								h={12}
								onChange={(e) => setMinutes(e.target.value)}
								value={minutes}
							>
								<option value='00'>00</option>
								<option value='15'>15</option>
								<option value='30'>30</option>
								<option value='45'>45</option>
							</Select>
						</Grid>
					</Grid>
				</ModalBody>

				<ModalFooter>
					<Button variant='ghost' onClick={props.onClose}>
						Cancel
					</Button>
					<Button colorScheme='brand'>Save</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}

export default FeedSettingsModal;
