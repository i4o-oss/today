import { useEffect, useState } from 'react';
import Container from '../components/common/Container';
import Header from '../components/common/Header';
import LandingPage from '../components/common/LandingPage';
import Feed from '../components/app/Feed';
import today from '../today.config';
import { supabase } from '../lib/supabaseClient';

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
		<Container height='100vh'>
			<Header session={session} user={user} />
			{session ? (
				<Feed blocks={blocks} updateBlocks={updateBlocks} />
			) : (
				<LandingPage />
			)}
		</Container>
	);
}

export default Index;
