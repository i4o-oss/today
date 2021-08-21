import { extendTheme } from '@chakra-ui/react';

const colors = {
	brand: {
		50: '#e0ffe0',
		100: '#b1ffb1',
		200: '#2cb67d',
		300: '#00a88b',
		400: '#009a95',
		500: '#008a9b',
		600: '#007a9b',
		700: '#006995',
		800: '#004d00',
		900: '#001b00',
	},
};

const fonts = {
	body: 'Inter, sans-serif',
	heading: 'Inter, sans-serif',
};

const theme = extendTheme({
	colors,
	fonts,
});

export default theme;
