import React from "react";
import { getResumeData } from "lib/resume";
import Experiences from "components/resume/Experiences";
import { ResumeType } from "types";
import { Metadata } from "next";
import { titleTemplate } from "lib/utilities";

export const dynamic = "force-static";
export const metadata: Metadata = {
	title: "Resume " + titleTemplate,
};

export default function Resume() {
	const resume: ResumeType = getResumeData();

	return (
		<>
			<h1>Resume</h1>
			<hr />
			<Experiences experience={resume.experience} />
		</>
	);
}
