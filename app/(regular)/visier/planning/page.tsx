import { Metadata } from "next";
import { titleTemplate } from "lib/utilities";
import { PlanningHero } from "components/PlanningHero";
import { PlanningContent } from "components/PlanningContent";

export const metadata: Metadata = {
	title: "Planning " + titleTemplate,
};

const Planning = () => {
	return (
		<div id="planning" className="project-content">
			<section className="hero">
				<h1>Planning Models</h1>
				<p>
					Turning Visier&apos;s people planning app into a top-tier ERP
					platform.
				</p>
			</section>
			<PlanningHero />
			<PlanningContent />
		</div>
	);
};

export default Planning;
