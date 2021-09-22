import Image from 'next/image';
import { chakra, Box, useColorModeValue, Flex } from '@chakra-ui/react';
import SubscriptionForm from './SubscriptionForm';

function Hero() {
	return (
		<Flex
			w='full'
			maxW='container.lg'
			px={4}
			py={32}
			flexDirection='column'
			alignItems='center'
			justifyContent='start'
			overflow='visible'
		>
			<Box
				w='100%'
				d='flex'
				flexDirection='column'
				alignItems='center'
				justifyContent='center'
				textAlign='center'
				mb={32}
			>
				<chakra.h1
					mb={4}
					fontSize='4xl'
					fontWeight='bold'
					lineHeight='tall'
					color={useColorModeValue('gray.900', 'white')}
				>
					Personalized digest delivered to your inbox everyday.
				</chakra.h1>
				<chakra.p mb={12} fontSize='2xl' lineHeight='tall'>
					From all the sources you care about. Articles, podcasts,
					videos, tweets and more.
				</chakra.p>
				<chakra.p mb={6} fontSize='xl' lineHeight='tall'>
					First 100 people to sign up for the early access will get
					lifetime access for free.
				</chakra.p>
				<SubscriptionForm cta='Join Waitlist' />
			</Box>
			<Flex
				w='100%'
				alignItems='center'
				justifyContent='center'
				overflow='visible'
			>
				<Box>
					<Image
						src='/assets/today_mockup_iphone12.png'
						width={400}
						height={813}
					/>
				</Box>
				<Box ml={8}>
					<Image
						src='/assets/today_mockup_iphone12_2.png'
						width={400}
						height={813}
					/>
				</Box>
			</Flex>
		</Flex>
	);
}

export default Hero;
