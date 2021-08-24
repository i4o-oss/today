import { useEffect, useState } from 'react';
import NextLink from 'next/link';
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
} from '@chakra-ui/react';
import { supabase } from '../../lib/supabaseClient';
import { FaMoon, FaSun } from 'react-icons/fa';

function Header() {
	const [session, setSession] = useState(null);
	const [user, setUser] = useState(null);
	const { toggleColorMode: toggleMode } = useColorMode();
	const text = useColorModeValue('dark', 'light');
	const SwitchIcon = useColorModeValue(FaMoon, FaSun);

	useEffect(() => {
		setSession(supabase.auth.session());
		setUser(supabase.auth.user());

		supabase.auth.onAuthStateChange((event, session) => {
			setSession(session);
		});
	}, []);

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
			<chakra.div h='4.5rem' mx='auto' maxW='container.lg'>
				<Flex
					w='full'
					h='full'
					px='6'
					align='center'
					justify='space-between'
				>
					<Flex align='center'>
						<Link href='/'>
							<HStack>
								{/*<Image src='/logo.png' width={40} height={40} />*/}
								<Text>Today</Text>
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
											size='md'
											name='Ilango Rajagopal'
											src='https://bit.ly/tioluwani-kolawole'
										/>
									</MenuButton>
									<MenuList>
										<MenuItem>
											<NextLink href='/app/settings/profile'>
												Settings
											</NextLink>
										</MenuItem>
										<MenuDivider />
										<MenuItem onClick={handleSignOut}>
											Logout
										</MenuItem>
									</MenuList>
								</Menu>
							) : (
								<Button
									colorScheme='brand'
									size='sm'
									variant='solid'
								>
									Sign In
								</Button>
							)}
						</HStack>
					</Flex>
				</Flex>
			</chakra.div>
		</chakra.header>
	);
}

export default Header;
