import MagicLink from "../components/magiclink";

export default function Custom404() {
	return (
		<>
			<h1>404</h1>
			<hr />
			<p className="hero-paragraph">This page could not be found.</p>
			<div className="content">
				<p>
					<MagicLink url="/">Back home</MagicLink>
				</p>
			</div>
		</>
	);
}
