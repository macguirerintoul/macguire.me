import { FancyListLink } from "components/FancyListLink";
import { Metadata } from "next";
import { getAllProjects } from "lib/project";
import { MagicLink } from "components/MagicLink";
import Balancer from "react-wrap-balancer";

export const metadata: Metadata = {
	title: "Macguire Rintoul",
	description: "Designer and developer",
	openGraph: {
		title: "Macguire Rintoul",
		description: "Designer and developer",
		url: "https://macguire.me",
		siteName: "Macguire Rintoul",
		type: "website",
		images: [
			{
				url: "api/opengraph.png",
				width: 1200,
				height: 630,
				alt: "Macguire Rintoul",
			},
		],
	},
};

export default async function Home() {
	const projects = await getAllProjects();
	return (
		<>
			<h1
				className="mb-12 text-5xl font-semibold"
				style={{ "--animation-order": 1 } as React.CSSProperties}
			>
				<Balancer>I&apos;m Macguire, a designer and developer.</Balancer>
			</h1>
			<h2 className="mb-1 text-2xl font-medium">Personally</h2>
			<p className="mb-12">
				Writing semantic HTML, surfing GitHub, adding stuff to my site because
				it&apos;s fun, celebrating the small web. Looking for inspiration.
				Reading type foundry newsletters. Homelabbing. DJing. Learning! Taking
				photos with my friends. Riding bikes.
			</p>
			<h2 className="mb-1 text-2xl font-medium">Professionally</h2>
			<p className="mb-12">
				Senior User Experience Designer at{" "}
				<MagicLink href="https://visier.com">Visier</MagicLink> designing data
				workflows, interactions, and visualizations.
			</p>
			<h2 className="mb-2 text-2xl font-medium">Projects</h2>
			{projects.map((project) => (
				<FancyListLink
					key={project.title}
					title={project.title}
					href={project.href}
				/>
			))}{" "}
		</>
	);
}
