import React from "react";
import { getResumeData } from "lib/resume";
import Experiences from "components/resume/Experiences";
import { getAlbums } from "lib/albums";
import { Albums } from "components/Albums";
import { ResumeType, Album } from "types";
import { Metadata } from "next";
import { titleTemplate } from "lib/utilities";

export const revalidate = 86400;

export const metadata: Metadata = {
	title: "About " + titleTemplate,
};

export default async function About() {
	const resume: ResumeType = getResumeData();
	const albums: Album[] = await getAlbums();

	return (
		<>
			<section>
				<h1>About</h1>
				<hr />
				<h2 className="mb-0">Now playing</h2>
			</section>
			<Albums albums={albums} />
			<section className="mt-12">
				<h2>Resume</h2>
				<Experiences experience={resume.experience} />
			</section>
		</>
	);
}
