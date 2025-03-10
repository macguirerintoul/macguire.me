import { FancyListLink } from "components/FancyListLink";
import { Metadata } from "next";
import { getAllProjects } from "lib/project";

export const metadata: Metadata = {
	title: "Macguire Rintoul",
};

export default async function Home() {
	const projects = await getAllProjects();
	return (
		<>
			<section className="dark:text-neutral-300">
				{/* <p
					className="text-2xl font-medium"
					style={{ "--animation-order": 1 } as React.CSSProperties}
				>
					I&apos;m Macguire, a designer and developer.
				</p> */}
				{/* <section
					// className="motion-safe:animate-floatUpSlow"
					style={{ "--animation-order": 2 } as React.CSSProperties}
				>
					<small>Personally</small>
					<p>
						Writing semantic HTML, surfing GitHub, adding stuff to my site
						because it&apos;s fun, celebrating the small web. Looking for
						inspiration. Reading type foundry newsletters. Wondering what design
						is and should be. Homelabbing. DJing. Learning! Taking photos with
						my friends. Riding bikes.
					</p>
				</section> */}
				<section
					// className="motion-safe:animate-floatUpSlow"
					style={{ "--animation-order": 3 } as React.CSSProperties}
				>
					{/* <small>Professionally</small>
					<p>
						Senior User Experience Designer at{" "}
						<MagicLink href="https://visier.com">Visier</MagicLink> designing
						data workflows, interactions, and visualizations.
					</p> */}
					{/* <small className="mb-8">Projects</small> */}
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
