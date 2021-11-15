const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
	const data = JSON.parse(req.body);
	const msg = {
		to: process.env.MY_EMAIL,
		from: "contact@macguire.me",
		subject: "Form submission: " + data.email,
		text: data.email + "\n" + data.message,
	};
	await sgMail
		.send(msg)
		.then(() => {
			res.status(200).json({ message: "all good" });
		})
		.catch((error) => {
			console.error(error);
			res.status(error).json({ message: "not all good" });
		});
}
