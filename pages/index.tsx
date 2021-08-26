import { useState } from 'react';
import Container from '../components/common/Container';
import Feed from '../components/app/Feed';
import today from '../today.config';

function Index() {
	const initial = Object.keys(today?.blocks);
	const [blocks, setBlocks] = useState(initial);

	const updateBlocks = (order: string[]) => {
		setBlocks(order);
		today.order = order;
	};

	return (
		<Container height='100vh'>
			{/*<Header />*/}
			{/*{session ? <Feed /> : <LandingPage />}*/}
			<Feed blocks={blocks} updateBlocks={updateBlocks} />
		</Container>
	);
}

export default Index;
