import Head from "next/head";
import React from "react";
import { GetStaticProps } from "next";
import { Layout, Resume } from "../components";
import { getResumeData } from "../lib/resume";
import { ResumeType } from "../lib/types";

export const getStaticProps: GetStaticProps = async () => {
	const resume: object = getResumeData();
	return {
		props: {
			resume,
		},
	};
};

export default function About(props: { resume: ResumeType }) {
	const resumePDF = () => {
		const link = document.createElement("a");
		link.href = "/api/resume";
		link.download = `Macguire Rintoul - Resume.pdf`;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

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
			<section className="content">
				<div className="resume">
					<button onClick={() => resumePDF()}>Download resumé</button>
					<button
						onClick={() =>
							window.open(
								"https://raw.githubusercontent.com/macguirerintoul/macguire.me/main/content/resume.yaml"
							)
						}
					>
						Get it in YAML!
					</button>
					<Resume resume={props.resume} showContact={false} />
				</div>
			</section>
		</Layout>
	);
}
