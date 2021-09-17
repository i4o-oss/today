import Image from "next/image";
import {
	chakra,
	Avatar,
	Button,
	Flex,
	HStack,
	IconButton,
	Link,
	Menu,
	MenuButton,
	MenuDivider,
	MenuItem,
	MenuList,
	Text,
	useColorMode,
	useColorModeValue,
	useDisclosure
} from '@chakra-ui/react';
import Auth from "./Auth";
import { supabase } from '../../lib/supabaseClient';
import { FaMoon, FaSun } from 'react-icons/fa';

interface HeaderProps {
	session: Record<string, unknown>,
	user: Record<string, unknown>
}

function Header(props: HeaderProps): JSX.Element {
	const { session, user } = props;
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { toggleColorMode: toggleMode } = useColorMode();
	const text = useColorModeValue('dark', 'light');
	const SwitchIcon = useColorModeValue(FaMoon, FaSun);

	async function handleSignOut() {
		await supabase.auth.signOut();
	}

	return (
		<chakra.header
			shadow={'sm'}
			transition='box-shadow 0.2s'
			w='full'
			overflowY='hidden'
		>
			<chakra.div h='24' mx='auto' maxW='container.lg'>
				<Flex w='full' h='full' align='center' justify='space-between'>
					<Flex align='center'>
						<Link href='/'>
							<HStack spacing={2}>
								<Image src='/logo.png' width={40} height={40} />
								<Text fontSize='xl' fontWeight='semibold'>Today</Text>
							</HStack>
						</Link>
					</Flex>

					<Flex
						justify='flex-end'
						w='full'
						maxW='824px'
						align='center'
						color='gray.400'
					>
						<HStack
							spacing='5'
							display={{ base: 'none', md: 'flex' }}
						>
							<IconButton
								size='md'
								fontSize='lg'
								aria-label={`Switch to ${text} mode`}
								variant='ghost'
								color='current'
								onClick={toggleMode}
								icon={<SwitchIcon />}
							/>
							{session && user ? (
								<Menu placement='bottom-end'>
									<MenuButton
										as={Button}
										p={0}
										bg='transparent'
										_hover={{ bg: 'transparent' }}
										_active={{ bg: 'transparent' }}
										_focus={{ bg: 'transparent' }}
									>
										<Avatar
											size='sm'
											name='Ilango Rajagopal'
										/>
									</MenuButton>
									<MenuList p={0}>
										<MenuItem>
											<Button p={0} variant='ghost'>
												Settings
											</Button>
										</MenuItem>
										<MenuDivider m={0} />
										<MenuItem>
											<Button onClick={handleSignOut} p={0} variant='ghost'>
												Sign Out
											</Button>
										</MenuItem>
									</MenuList>
								</Menu>
							) : (
								<>
									<Button
										colorScheme='brand'
										onClick={onOpen}
										size='sm'
										variant='solid'
									>
										Sign In
									</Button>
									<Auth isOpen={isOpen} onClose={onClose} />
								</>
							)}
						</HStack>
					</Flex>
				</Flex>
			</chakra.div>
		</chakra.header>
	);
}

export default Header;
