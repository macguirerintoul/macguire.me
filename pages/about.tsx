import Head from "next/head";
import React from "react";
import { GetStaticProps } from 'next'
import Layout from "../components/layout";
import Resume from "../components/resume";
import { getResumeData } from "../lib/resume";

export const getStaticProps: GetStaticProps = async () => {
	const resume: object = getResumeData();
	return {
		props: {
			resume,
		},
	};
}

export default function About(props) {
	const resumePDF = () => {
		fetch("/api/resume").then(response => { 
			const blob = new Blob([response["data"]], { type: "application/pdf" });
			const link = document.createElement("a");
			link.href = window.URL.createObjectURL(blob);
			link.download = `Macguire Rintoul - Resume.pdf`;
			link.click();
		});
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
				<button onClick={()=>resumePDF()}>resume pdf</button>
				<section className="content">
			<div className="resume">
				<h2>Experience</h2>
				<Resume resume={props.resume} />
			</div>
		</section>
			</Layout>
		);

}