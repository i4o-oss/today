import nc from 'next-connect';
import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../lib/supabaseClient';

async function joinWaitlist(req: NextApiRequest, res: NextApiResponse) {
	try {
		const { email } = req.body;

		const { count } = await supabase
			.from('waitlist')
			.select('id', { count: 'exact', head: true });

		const { data, error } = await supabase
			.from('waitlist')
			.upsert({ email, number: count + 1 })
			.single();

		if (data && !error) {
			res.status(200).send({ message: 'success', data });
		} else {
			res.status(500).send({ message: 'error', error });
		}
	} catch (e) {
		console.log(e);
	}
}

export default nc({ attachParams: true }).post(joinWaitlist);
