import type { NextApiRequest, NextApiResponse } from "next";
import nc from 'next-connect';

async function generate(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json({ name: 'James Holden' });
}

export default nc({ attachParams: true }).get(generate);