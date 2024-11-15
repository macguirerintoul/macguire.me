"use server";
import { ServerClient } from "postmark";
export async function contactFormAction(prevState: any, formData: FormData) {
	console.log("contact form action triggered");
	const replyTo = formData.get("replyTo");
	const message = formData.get("message");

	if (
		replyTo &&
		message &&
		typeof replyTo == "string" &&
		typeof message == "string" &&
		process.env.POSTMARK_SERVER_API_TOKEN &&
		process.env.EMAIL_FROM &&
		process.env.EMAIL_TO
	) {
		try {
			const client = new ServerClient(process.env.POSTMARK_SERVER_API_TOKEN);
			console.log("attempting to send email");
			client.sendEmail({
				From: process.env.EMAIL_FROM,
				To: process.env.EMAIL_TO,
				ReplyTo: replyTo,
				Subject: `macguire.me: message from ${replyTo}`,
				TextBody: message,
			});

			return { status: "sent email" };
		} catch (error: unknown) {
			if (error instanceof Error) {
				return { status: "error" };
			}
		}
	} else {
		console.log("some condition not met");
		return { status: "error" };
	}
}
