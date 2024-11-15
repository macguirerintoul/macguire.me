import { ServerClient } from "postmark";

export async function POST(request: Request) {
	const formData = await request.formData();

	const email = formData.get("email");
	const message = formData.get("message");

	if (
		formData.get("message") &&
		process.env.POSTMARK_SERVER_API_TOKEN &&
		process.env.EMAIL_FROM &&
		process.env.EMAIL_TO &&
		typeof message == "string" &&
		typeof email == "string"
	) {
		try {
			const client = new ServerClient(process.env.POSTMARK_SERVER_API_TOKEN);
			client.sendEmail({
				From: process.env.EMAIL_FROM,
				To: process.env.EMAIL_TO,
				ReplyTo: email,
				Subject: "Contact form: macguire.me",
				TextBody: message,
			});
			return new Response("Success!", {
				status: 200,
			});
		} catch (error: unknown) {
			if (error instanceof Error) {
				return new Response(`Error ${error.message}`, {
					status: 500,
				});
			}
		}
	}
}
