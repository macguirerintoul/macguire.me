import React from "react";
import { Blockquote, VisierLogos, VisierHero } from "components";
import Link from "next/link";
import { titleTemplate } from "lib/utilities";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Visier " + titleTemplate,
};

const Visier = () => {
	return (
		<div id="visier" className="project-content">
			<VisierHero />
			<section className="hero">
				<h1 className="mb-4">Visier People</h1>
				<p className="text-3xl">
					Visier is the leader in People Analytics; a fancy term for using
					workforce data to make better business decisions. 1 in 3 Fortune 500
					companies use Visier to improve their employee retention, talent
					acquisition, engagement, and more.
				</p>
			</section>
			<section>
				<h2>Case studies</h2>
				<ul className="link-list">
					<li>
						<Link href="/visier/pie-charts">
							Pie charts? In <em>my</em> software?
						</Link>
					</li>
					<li>
						<Link href="/visier/planning">Custom Planning Models</Link>
					</li>
				</ul>
			</section>
			<div className="stats util-wide">
				<div className="card">
					<div>15M</div>
					<div>employee records</div>
				</div>
				<div className="card">
					<div>25K</div>
					<div>customers</div>
				</div>
				<div className="card">
					<div>75</div>
					<div>countries</div>
				</div>
			</div>
			<VisierLogos />

			<section>
				<h2>What I Do</h2>
				<ul>
					<li>
						lead product design for new initiatives and workflows in enterprise
						planning and analytics
					</li>
					<li>
						independently determine project requirements and collaborate with
						relevant stakeholders to ensure successful execution and maximize
						return on investment
					</li>
					<li>
						lead and mentor a team of junior designers, helping them grow their
						skills and deliver outstanding design
					</li>
				</ul>
			</section>
			<section>
				<Blockquote source="Sr. Director of People Analytics, eBay">
					Visier has helped us empower leaders and managers with great insights
					and a great user experience. The tool is simple. It focuses people on
					the right data, so they can take actions with confidence.
				</Blockquote>
			</section>

			<section>
				<h2>More projects</h2>
				<ul className="more-projects">
					<li>
						Collaboration Circle - A brand new visualization showing
						collaboration metrics between people and groups.
					</li>
					<li>
						Multi-cohort analysis - A 93-page elaboration of potential
						multi-cohort analytics workflows.
					</li>
					<li>
						Traffic Lighting legend upgrade - Redesign of how semantic
						formatting is communicated to viewers of a data visualization.
					</li>
					<li>
						Auto-drill as context - A framework for serving content that adapts
						to data access permissions.
					</li>
					<li>
						Small multiples - Interaction and data visualization design for
						creating small multiples visuals.
					</li>
					<li>
						“Explore this” - Interaction design for a straightforward data
						exploration workflow.
					</li>
				</ul>
			</section>
		</div>
	);
};

export default Visier;