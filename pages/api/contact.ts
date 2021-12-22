const sendgrid = require("@sendgrid/mail");
import type { NextApiRequest, NextApiResponse } from 'next'

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const data: {email:string, message: string} = JSON.parse(req.body);
	const msg = {
		to: process.env.MY_EMAIL,
		from: "contact@macguire.me",
		subject: "Form submission: " + data.email,
		text: data.email + "\n" + data.message,
	};
	await sendgrid
		.send(msg)
		.then(() => {
			res.status(200).json({ message: "all good" });
		})
		.catch((error) => {
			console.error(error);
			res.status(500).json({ message: "not all good" });
		});
}
