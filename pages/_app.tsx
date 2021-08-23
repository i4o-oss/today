import { AppProps } from 'next/app';

import { ChakraProvider } from '@chakra-ui/react';
import theme from '../theme';

function Today({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider resetCSS theme={theme}>
			<Component {...pageProps} />
		</ChakraProvider>
	);
}

export default Today;
