import { MagicLink } from "../components";

export default function Colophon() {
	return (
		<>
			<h1>Colophon</h1>
			<hr />
			<section className="hero">
				<p>
					Built with <MagicLink url="https://nextjs.org/">Next.js</MagicLink>{" "}
					and deployed on{" "}
					<MagicLink url="https://vercel.com/">Vercel</MagicLink>. Set in{" "}
					<MagicLink url="https://editorialnew.com/">Editorial New</MagicLink>{" "}
					by{" "}
					<MagicLink url="https://pangrampangram.com/">
						Pangram Pangram
					</MagicLink>
					.
				</p>
			</section>
		</>
	);
}
