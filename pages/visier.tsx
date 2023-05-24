import Head from "next/head";
import React from "react";
import { Blockquote, VisierLogos, VisierHero } from "../components";
import Link from "next/link";
import { titleTemplate } from "../lib/utilities";

const Visier = () => {
	return (
		<>
			<Head>
				<title>{"Visier" + titleTemplate}</title>
			</Head>
			<VisierHero />
			<section className="hero">
				<h1>Visier People</h1>
				<p>
					Visier is the leader in People Analytics; a fancy term for using
					workforce data to make better business decisions. 1 in 3 Fortune 500
					companies use Visier to improve their employee retention, diversity
					and inclusion, engagement, and more.
				</p>
			</section>
			<div className="stats">
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
						lead product design for new initiatives in enterprise planning and
						analytics
					</li>
					<li>manage our co-op program, having mentored 7 students so far</li>
					<li>manage a team of co-ops to deliver platform features</li>
					<li>
						create 5 and supervised 1 of Visier People’s 19 visualizations
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
			<h2>Case studies</h2>
			<ul>
				<li>
					<Link href="/visier/planning">Custom Planning Models</Link>
				</li>
			</ul>
			<h2>More projects</h2>
			<ul className="more-projects">
				<li>
					Collaboration Circle - A brand new visualization showing collaboration
					metrics between people and groups.
				</li>
				<li>
					Multi-cohort analysis - A 93-page elaboration of potential
					multi-cohort analytics workflows.
				</li>
				<li>
					Traffic Lighting legend upgrade - Redesign of how semantic formatting
					is communicated to viewers of a data visualization.
				</li>
				<li>
					Auto-drill as context - A framework for serving content that adapts to
					data access permissions.
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
		</>
	);
};

export default Visier;
