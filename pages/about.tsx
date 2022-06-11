import Head from "next/head";
import React from "react";
import { GetStaticProps } from "next";
import { Resume } from "../components";
import { getResumeData } from "../lib/resume";
import { ResumeType } from "../lib/types";
import ResumeButtons from "../components/resume/resumebuttons";

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
				<p>
					I&apos;m Macguire—experience designer, software developer, music
					producer, DJ. Currently working as a User Experience Designer at
					Visier.
				</p>
				<ResumeButtons />
			</section>
			<hr />
			<section className="content">
				<div className="resume">
					<Resume resume={props.resume} showContact={false} />
				</div>
			</section>
		</>
	);
}
