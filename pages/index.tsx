import Head from "next/head";
import { motion } from "framer-motion";
import { MagicLink } from "../components";

const list = {
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
		},
	},
	hidden: {
		opacity: 1,
	},
};

const itemVariants = {
	visible: {
		opacity: 1,
		y: 0,
		transition: { ease: "easeInOut", duration: 0.3 },
	},
	hidden: { opacity: 0, y: 30 },
};

const projects: { name: string; url: string }[] = [
	{ name: "Visier People", url: "/visier" },
	{ name: "ROAR", url: "/roar" },
	{ name: "Nitecloud", url: "/nitecloud" },
	{ name: "MyCredit", url: "/mycredit" },
	{ name: "Forecast", url: "/forecast" },
];

export default function Home() {
	let baseURL = "";
	if (typeof window !== "undefined") {
		baseURL = window.location.href;
	}
	return (
		<>
			<Head>
				<title>Macguire Rintoul, Experience Designer</title>
				<meta property="og:image" content={baseURL + "api/ogimage"} />
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
				{projects.map((project) => (
					<motion.li
						key={project.name}
						variants={itemVariants}
						whileHover={{ x: 2 }}
					>
						<MagicLink url={project.url}>{project.name + " →"}</MagicLink>
					</motion.li>
				))}
			</motion.ul>
		</>
	);
}
