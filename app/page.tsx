import { FancyListLink } from "components/FancyListLink";
import { Metadata } from "next";
import { getAllProjects } from "lib/project";
import { MagicLink } from "components/MagicLink";
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
			<section className="dark:text-neutral-300">
				<h1
					className="mb-4 text-2xl font-medium"
					style={{ "--animation-order": 1 } as React.CSSProperties}
				>
					I&apos;m Macguire, a designer and developer.
				</h1>
				<section
					// className="motion-safe:animate-floatUpSlow"
					style={{ "--animation-order": 2 } as React.CSSProperties}
				>
					<h2 className="mt-8 mb-1 text-lg font-semibold">Personally</h2>
					<p>
						Writing semantic HTML, surfing GitHub, adding stuff to my site
						because it&apos;s fun, celebrating the small web. Looking for
						inspiration. Reading type foundry newsletters. Homelabbing. DJing.
						Learning! Taking photos with my friends. Riding bikes.
					</p>
				</section>
				<section
					// className="motion-safe:animate-floatUpSlow"
					style={{ "--animation-order": 3 } as React.CSSProperties}
				>
					<h2 className="mt-8 mb-1 text-lg font-semibold">Professionally</h2>
					<p>
						Senior User Experience Designer at{" "}
						<MagicLink href="https://visier.com">Visier</MagicLink> designing
						data workflows, interactions, and visualizations.
					</p>
					<h2 className="mt-8 mb-2 text-lg font-semibold">Projects</h2>
					{projects.map((project) => (
						<FancyListLink
							key={project.title}
							title={project.title}
							href={project.href}
						/>
					))}
				</section>
			</section>
		</>
	);
}
