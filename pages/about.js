import Head from "next/head";
import React from "react";
import Layout from "../components/layout";
import Resume from "../components/resume";
import { getResume } from "../lib/resume";

export async function getStaticProps() {
	const resume = getResume();
	return {
		props: {
			resume,
		},
	};
}

class About extends React.Component {
	constructor(props) {
		super(props);
		this.resumePDF = this.resumePDF.bind(this);
	}

	resumePDF = () => {
		fetch("/api/resume").then(response => { 
			const blob = new Blob([response.data], { type: "application/pdf" });
			const link = document.createElement("a");
			link.href = window.URL.createObjectURL(blob);
			link.download = `Macguire Rintoul - Resume.pdf`;
			link.click();
		});
	};

	render() {
		return (
			<Layout>
				<Head>
					<title>About ✦ Macguire Rintoul</title>
				</Head>
				<h1>About</h1>
				<hr />
				<p className="hero-paragraph">
					I&apos;m Macguire — an experience designer, software developer, music
					producer, and DJ. I currently work as a User Experience Designer at
					Visier. In December 2020, I graduated with distinction with a Bachelor
					of Science in Interactive Arts & Technology from SFU.
				</p>
				<hr />
				<button onClick={this.resumePDF}>resume pdf</button>
				<section className="content">
			<div className="resume">
				<h2>Experience</h2>
				<Resume resume={this.props.resume} />
			</div>
		</section>
			</Layout>
		);
	}
}

export default About;
