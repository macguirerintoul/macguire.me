import { useActionState } from "react";
import { revalidatePath } from "next/cache";
import { sendEmail } from "lib/utilities";
export default function ContactForm() {
	const [state, formAction] = useActionState(handleSubmit, {
		replyTo: "",
		message: "",
	});

	async function handleSubmit(
		prevState: { replyTo: string; message: string },
		formData: FormData
	) {
		"use server";

		const replyTo = formData.get("replyTo");
		const message = formData.get("message");

		if (
			replyTo &&
			message &&
			typeof replyTo == "string" &&
			typeof message == "string"
		) {
			sendEmail(replyTo, message);

			revalidatePath("/");
			return { message: `Added todo ${data.todo}` };
		}
	}

	return (
		<form action={handleSubmit}>
			<label>Email</label>
			<input
				type="email"
				placeholder="your@email.com"
				name="replyTo"
				className="mb-2 block w-full rounded-lg border border-neutral-300 bg-neutral-50 p-2.5 text-sm text-neutral-900 placeholder:text-neutral-500 focus:border-blue-500 focus:ring-blue-500"
			/>
			<label>Message</label>
			<textarea
				name="message"
				rows={4}
				className="mb-2 block w-full rounded-lg border border-neutral-300 bg-neutral-50 p-2.5 text-sm text-neutral-900 placeholder:text-neutral-500 focus:border-blue-500 focus:ring-blue-500"
				placeholder="Please type your message here."
			></textarea>
			<button
				type="submit"
				className="mb-2 rounded-lg border border-neutral-300 bg-white px-5 py-2.5 text-sm font-medium text-neutral-900 hover:bg-neutral-100 focus:outline-none focus:ring-4 focus:ring-neutral-100"
			>
				Submit
			</button>
		</form>
	);
}
