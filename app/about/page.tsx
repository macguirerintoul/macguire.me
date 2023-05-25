import Head from "next/head";
import React from "react";
import { getResumeData } from "lib/resume";
import Experiences from "components/resume/Experiences";
import { getAlbums } from "lib/albums";
import { Albums } from "components/Albums";
import { ResumeType, Album } from "lib/types";

export default async function About() {
	const resume: ResumeType = getResumeData();
	const albums: Album[] = await getAlbums();

	return (
		<>
			<Head>
				<title>About ✦ Macguire Rintoul</title>
			</Head>
			<section>
				<h1>About</h1>
				<hr />
				<h2>On rotation</h2>
			</section>
			<Albums albums={albums} />
			<section>
				<h2>Resume</h2>

				<Experiences experience={resume.experience} />
			</section>
		</>
	);
}
