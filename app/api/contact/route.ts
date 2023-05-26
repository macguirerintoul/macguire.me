import sendgrid from "@sendgrid/mail";
import { NextResponse } from "next/server";

if (process.env.SENDGRID_API_KEY) {
	sendgrid.setApiKey(process.env.SENDGRID_API_KEY);
} else {
	throw new Error("SENDGRID_API_KEY environment variable is not set");
}

export async function GET() {
	return NextResponse.json({ message: "hi" });
}

export async function POST(req: Request) {
	const data: { email: string; message: string } = await req.json();
	const msg = {
		to: process.env.MY_EMAIL as string,
		from: process.env.FROM_EMAIL as string,
		subject: "Form submission: " + data.email,
		text: data.email + "\n" + data.message,
	};
	await sendgrid
		.send(msg)
		.then(() => {
			NextResponse.json({ message: "all good" });
		})
		.catch((error) => {
			console.error(error);
			NextResponse.json({ message: "not all good" }, { status: 500 });
		});
}
