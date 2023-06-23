import { MagicLink } from "components";
import { Metadata } from "next";

const projects: { name: string; url: string }[] = [
	{ name: "Visier People", url: "/visier" },
	{ name: "Forecast", url: "/forecast" },
];

export const metadata: Metadata = {
	title: "Macguire Rintoul, Experience Designer",
};

export default function Home() {
	let baseURL = "";
	if (typeof window !== "undefined") {
		baseURL = window.location.href;
	}
	return (
		<>
			<section>
				<p className="hero">
					Senior User Experience Designer at{" "}
					<MagicLink url="https://visier.com">Visier</MagicLink>
				</p>
			</section>
			<section>
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
			</section>
		</>
	);
}
