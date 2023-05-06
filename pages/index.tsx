import Head from "next/head";
import { MagicLink } from "../components";

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
			<ul className="link-list">
				{projects.map((project, index) => (
					<li
						key={project.name}
						style={{ "--animation-order": index } as React.CSSProperties}
					>
						<MagicLink url={project.url}>{project.name + " →"}</MagicLink>
					</li>
				))}
			</ul>
		</>
	);
}
