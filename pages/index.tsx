import { useEffect, useState } from 'react';
import { chakra } from '@chakra-ui/react';
import Container from '../components/common/Container';
import Header from '../components/common/Header';
import LandingPage from '../components/common/LandingPage';
import Feed from '../components/app/Feed';
import today from '../today.config';
import { supabase } from '../lib/supabaseClient';
import Footer from '../components/common/Footer';

function Index() {
	const [session, setSession] = useState(undefined);
	const [user, setUser] = useState(undefined);
	const [blocks, setBlocks] = useState(today?.order);

	useEffect(() => {
		setUser(supabase.auth.user());

		supabase.auth.onAuthStateChange((event, session) => {
			setSession(session);
		});
	}, []);

	useEffect(() => {
		setSession(supabase.auth.session());
	}, [user]);

	const updateBlocks = (order: string[]) => {
		setBlocks(order);
		today.order = order;
	};

	return (
		<Container height='auto' minH='100vh'>
			<Header session={session} user={user} />
			<chakra.div
				w='full'
				h='auto'
				d='flex'
				flexDirection='column'
				alignItems='center'
				justifyContent='flex-start'
				flex='1 0 auto'
			>
				{session ? (
					<Feed blocks={blocks} updateBlocks={updateBlocks} />
				) : (
					<LandingPage />
				)}
			</chakra.div>
			<Footer />
		</Container>
	);
}

export default Index;
