import { MagicLink } from "components";

export default function NotFound() {
	return (
		<section>
			<h1>404 :(</h1>
			<hr />
			<p className="hero-paragraph">This page could not be found.</p>
			<p>
				<MagicLink url="/">Back home</MagicLink>
			</p>
		</section>
	);
}
