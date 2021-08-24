import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import Container from '../components/common/Container';
import Header from '../components/common/Header';
import LandingPage from '../components/common/LandingPage';
import Feed from '../components/app/Feed';

function Index() {
	const [session, setSession] = useState(null);

	useEffect(() => {
		setSession(supabase.auth.session());

		supabase.auth.onAuthStateChange((event, session) => {
			setSession(session);
		});
	}, []);

	return (
		<Container height='100vh'>
			<Header />
			{session ? <Feed /> : <LandingPage />}
		</Container>
	);
}

export default Index;
