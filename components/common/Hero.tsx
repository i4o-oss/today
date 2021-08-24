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
					fontSize={{ base: '3xl', md: '4xl' }}
					fontWeight='bold'
					lineHeight='tall'
					color={useColorModeValue('gray.900', 'white')}
				>
					Personalized digest delivered to your inbox everyday.
				</chakra.h1>
				<chakra.p
					mb={12}
					color='gray.500'
					fontSize='xl'
					lineHeight='tall'
				>
					From all the sources you care about. Articles, podcasts,
					videos, tweets.
				</chakra.p>
				<SubscriptionForm />
			</Box>
			<Box w='100%' overflow='visible'>
				<Image
					src='/assets/banner-thumb.png'
					width={1126}
					height={796}
				/>
			</Box>
		</Flex>
	);
}

export default Hero;
