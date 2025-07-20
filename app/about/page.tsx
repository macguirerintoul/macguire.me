import React from "react";
import { getResumeData } from "lib/resume";
import Experiences from "components/resume/Experiences";
import { ResumeType } from "types";
import { Metadata } from "next";
import { titleTemplate } from "lib/utilities";

export const revalidate = 86400;

export const metadata: Metadata = {
	title: "About " + titleTemplate,
};

export default async function About() {
	const resume: ResumeType = getResumeData();

	return (
		<>
			<section>
				<h1>About</h1>
				<hr />
				<h2 className="mb-0">Now playing</h2>
			</section>

			<section className="mt-12">
				<h2>Resume</h2>
				<Experiences experience={resume.experience} />
			</section>
		</>
	);
}
