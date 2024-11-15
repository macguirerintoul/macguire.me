import { titleTemplate } from "lib/utilities";
import { Metadata } from "next";
import ContactForm from "components/ContactForm";

export const metadata: Metadata = {
	title: "Contact " + titleTemplate,
};

const Contact = async () => {
	return (
		<>
			<section>
				<h1>Contact</h1>
				<hr />
				<ContactForm />
			</section>
		</>
	);
};

export default Contact;
