import Head from "next/head";
import React from "react";
import visier from "../content/images/visier.png";
import Image from "next/image";
import { Blockquote, VisierLogos, VisierHero } from "../components";

export default function Visier() {
	return (
		<>
			<Head>
				<title>Visier ✦ Macguire Rintoul</title>
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
			<Blockquote source="Sr. Director of People Analytics, eBay">
				Visier is a great way for me to help empower my leaders, help empower my
				managers with great insights, but also a great user experience that
				makes the tool simple.
			</Blockquote>
			<Image src={visier} alt="Screenshot of the Visier People application" />
			<p>
				At Visier, I work on applications for enterprise planning and data
				analytics. Our goal is to free people from convoluted data interfaces
				and empower every manager to make decisions based on data.
			</p>
		</>
	);
}