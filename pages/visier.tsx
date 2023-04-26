import Head from "next/head";
import React from "react";
import { Blockquote, VisierLogos, VisierLayout } from "../components";
import { ReactElement } from "react";
import Link from "next/link";

const Visier = () => {
	return (
		<>
			<Head>
				<title>Visier ✦ Macguire Rintoul</title>
			</Head>
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
				<div>
					<div>15M</div>
					<div>employee records</div>
				</div>
				<div>
					<div>25K</div>
					<div>customers</div>
				</div>
				<div>
					<div>75</div>
					<div>countries</div>
				</div>
			</div>
			<VisierLogos />
			<p>
				At Visier, I work on applications for enterprise planning and data
				analytics. Our goal is to free people from convoluted data interfaces
				and empower every manager to make decisions based on data.
			</p>
			<Blockquote source="Sr. Director of People Analytics, eBay">
				Visier has helped us empower leaders and managers with great insights
				and a great user experience. The tool is simple. It focuses people on
				the right data, so they can take actions with confidence.
			</Blockquote>
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

Visier.getLayout = function getLayout(page: ReactElement) {
	return <VisierLayout>{page}</VisierLayout>;
};

export default Visier;
