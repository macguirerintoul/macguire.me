import { MagicLink } from "components/MagicLink";

export default function NotFound() {
	return (
		<section>
			<h1>404 :(</h1>
			<hr />
			<p className="hero-paragraph">This page could not be found.</p>
			<p>
				<MagicLink href="/">Back home</MagicLink>
			</p>
		</section>
	);
}
