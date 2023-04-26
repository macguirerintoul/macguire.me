import Head from "next/head";
import { motion } from "framer-motion";
import { MagicLink } from "../components";
import { list } from "../lib/utilities";

export default function Home() {
	return (
		<>
			<Head>
				<title>Macguire Rintoul, Experience Designer</title>
				<link
					rel="icon"
					href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🥴</text></svg>"
				/>
			</Head>
			<p className="hero">
				Senior User Experience Designer at{" "}
				<MagicLink url="https://visier.com">Visier</MagicLink>
			</p>
			<motion.ul
				className="link-list"
				initial="hidden"
				animate="visible"
				variants={list}
			>
				<li>
					<MagicLink url="/visier">Visier People →</MagicLink>
				</li>
				<li>
					<MagicLink url="/roar">ROAR →</MagicLink>
				</li>
				<li>
					<MagicLink url="/nitecloud">Nitecloud →</MagicLink>
				</li>
				<li>
					<MagicLink url="/mycredit">MyCredit →</MagicLink>
				</li>
				<li>
					<MagicLink url="/forecast">Forecast →</MagicLink>
				</li>
			</motion.ul>
		</>
	);
}
