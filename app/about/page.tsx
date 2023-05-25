import Head from "next/head";
import React from "react";
import { getResumeData } from "lib/resume";
import Experiences from "components/resume/Experiences";
import { baseurl } from "lib/utilities";
import { Albums } from "components/Albums";

export default async function About() {
	const resume: object = getResumeData();
	const albumResponse = await fetch(`${baseurl}/api/albums`);
	const albums = await albumResponse.json();

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
