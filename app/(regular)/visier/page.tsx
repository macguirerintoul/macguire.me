import React from "react";
import { Blockquote } from "components/Blockquote";
import { VisierLogos } from "components/VisierLogos";
import { VisierHero } from "components/VisierHero";
import Link from "next/link";
import { titleTemplate } from "lib/utilities";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Visier " + titleTemplate,
};

const stats = [
	{ number: "15M", label: "employee records" },
	{ number: "25K", label: "customers" },
	{ number: "75", label: "countries" },
];

const Visier = () => {
	return (
		<div className="relative">
			<VisierHero />
			<div className="mx-auto max-w-5xl delay-0 motion-safe:animate-floatUpSingle">
				<h1 className="mb-4 text-center">Visier People</h1>
				<p className="my-24 bg-neutral-50 text-3xl shadow-[0px_0px_39px_56px_rgba(250,250,250,1)] shadow-neutral-50 sm:text-5xl sm:leading-tight">
					Visier is the leader in People Analytics; a fancy term for using
					workforce data to make better business decisions. 1 in 3 Fortune 500
					companies use Visier to improve their employee retention, talent
					acquisition, engagement, and more.
				</p>
			</div>

			<div className="mx-auto flex max-w-5xl flex-col justify-between motion-safe:animate-floatUpSingle sm:mt-32 sm:flex-row">
				{stats.map((stat) => {
					return (
						<div
							key={stat.number}
							className="card mb-2 flex w-full rounded-lg bg-white p-4 shadow-md sm:mb-0 sm:w-72 sm:flex-col sm:p-8"
						>
							<div className="mr-1 text-lg sm:mr-0 sm:text-7xl">
								{stat.number}
							</div>
							<div className="text-neutral-500">{stat.label}</div>
						</div>
					);
				})}
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
			<section className="my-24 sm:my-60">
				<Blockquote source="Sr. Director of People Analytics, eBay">
					Visier has helped us empower leaders and managers with great insights
					and a great user experience. The tool is simple. It focuses people on
					the right data, so they can take actions with confidence.
				</Blockquote>
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
