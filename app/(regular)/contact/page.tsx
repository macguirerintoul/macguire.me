import { titleTemplate } from "lib/utilities";
import { Metadata } from "next";
import { getLatestCommit } from "lib/utilities";
import ContactForm from "components/ContactForm";

export const metadata: Metadata = {
	title: "Contact " + titleTemplate,
};

const Contact = async () => {
	const commit = await getLatestCommit();
	return (
		<>
			<section>
				<h1>Contact</h1>
				<hr />
				<div className="flex h-36 items-center justify-center rounded-xl border shadow-lg">
					<code>
						{typeof commit === "string"
							? "web@macguire.me"
							: `${commit.sha.substr(0, 6)}@macguire.me`}
					</code>
				</div>
			</section>
		</>
	);
};

export default Contact;
