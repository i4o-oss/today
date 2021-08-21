import React from 'react';
import Image from 'next/image';
import {
	chakra,
	Flex,
	HStack,
	Icon,
	IconButton,
	Link,
	useColorMode,
	useColorModeValue,
	Box,
} from '@chakra-ui/react';
import { FaMoon, FaSun, FaHeart } from 'react-icons/fa';
import { AiFillGithub } from 'react-icons/ai';

function Header() {
	const { toggleColorMode: toggleMode } = useColorMode();
	const text = useColorModeValue('dark', 'light');
	const SwitchIcon = useColorModeValue(FaMoon, FaSun);

	const SponsorButton = (
		<Box
			display={{ base: 'none', md: 'flex' }}
			alignItems='center'
			as='a'
			aria-label='Sponsor Choc UI on Open Collective'
			href={''}
			target='_blank'
			rel='noopener noreferrer'
			bg='gray.50'
			borderWidth='1px'
			borderColor='gray.200'
			px='1em'
			minH='36px'
			rounded='md'
			fontSize='sm'
			color='gray.800'
			outline='0'
			transition='all 0.3s'
			_hover={{
				bg: 'gray.100',
				borderColor: 'gray.300',
			}}
			_active={{
				borderColor: 'gray.200',
			}}
			_focus={{
				boxShadow: 'outline',
			}}
			ml={5}
		>
			<Icon as={FaHeart} w='4' h='4' color='red.500' mr='2' />
			<Box as='strong' lineHeight='inherit' fontWeight='semibold'>
				Sponsor
			</Box>
		</Box>
	);

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
								<Image src='/logo.png' width={40} height={40} />
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
							<Link
								isExternal
								aria-label='Go to Choc UI GitHub page'
								href='https://github.com/opencatalysts/today'
							>
								<Icon
									as={AiFillGithub}
									display='block'
									transition='color 0.2s'
									w='5'
									h='5'
									_hover={{ color: 'gray.600' }}
								/>
							</Link>
						</HStack>
						<IconButton
							size='md'
							fontSize='lg'
							aria-label={`Switch to ${text} mode`}
							variant='ghost'
							color='current'
							ml={{ base: '0', md: '3' }}
							onClick={toggleMode}
							icon={<SwitchIcon />}
						/>
						{SponsorButton}
					</Flex>
				</Flex>
			</chakra.div>
		</chakra.header>
	);
}

export default Header;
