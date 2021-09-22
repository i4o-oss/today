import { AppProps } from 'next/app';
import Head from 'next/head';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../theme';

function Today({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider resetCSS theme={theme}>
			<Head>
				<title>
					Today - Personalized digest delivered to your inbox everyday
				</title>
			</Head>
			<Component {...pageProps} />
		</ChakraProvider>
	);
}

export default Today;
