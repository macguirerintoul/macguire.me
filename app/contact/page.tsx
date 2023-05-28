import { getLatestCommit } from "lib/utilities";

const Contact = async () => {
	const commit = await getLatestCommit();

	return (
		<>
			<section>
				<h1>Contact</h1>
				<hr />
				<div className="email-card">
					<code>{commit.sha.substr(0, 6)}@macguire.me</code>
				</div>
			</section>
		</>
	);
};

export default Contact;
