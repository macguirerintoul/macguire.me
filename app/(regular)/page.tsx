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
				<p className="mb-20 text-3xl ">
					Senior User Experience Designer at{" "}
					<MagicLink url="https://visier.com">Visier</MagicLink>
				</p>
			</section>
			<section>
				<ul className="list-none pl-0">
					{projects.map((project, index) => (
						<li
							className="transition-left relative left-0 my-3 text-5xl tracking-tight duration-100 ease-in-out motion-safe:animate-floatUp motion-safe:hover:left-1 md:my-8 md:text-6xl"
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
