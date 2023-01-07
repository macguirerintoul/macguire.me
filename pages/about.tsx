import Head from "next/head";
import React from "react";
import { GetStaticProps } from "next";
import { getResumeData } from "../lib/resume";
import { ResumeType } from "../lib/types";
import ResumeButtons from "../components/resume/resumebuttons";
import Experiences from "../components/resume/experiences";

export const getStaticProps: GetStaticProps = async () => {
	const resume: object = getResumeData();
	return {
		props: {
			resume,
		},
	};
};

export default function About(props: { resume: ResumeType }) {
	return (
		<>
			<Head>
				<title>About ✦ Macguire Rintoul</title>
			</Head>
			<h1>About</h1>
			<hr />
			<section className="hero grid">
				<p>Senior User Experience Designer at Visier, among other things.</p>
				<ResumeButtons />
			</section>
			<hr />
			<section className="resume">
				<Experiences experience={props.resume.experience} />
			</section>
		</>
	);
}
