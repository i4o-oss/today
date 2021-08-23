import { GetServerSideProps } from 'next';
// import {} from '@chakra-ui/react';

import Container from '../../components/common/Container';
import Header from '../../components/common/Header';

function Feed(props) {
	return (
		<Container height='100vh'>
			<Header />
		</Container>
	);
}

export default Feed;

export const getServerSideProps: GetServerSideProps = async (context) => {
	const {
		params: { slug },
	} = context;

	// Fetch feeds based on slug
	return {
		props: {
			slug,
			today: {},
		},
	};
};
