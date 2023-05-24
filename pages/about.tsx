import Head from "next/head";
import React from "react";
import { GetStaticProps } from "next";
import { getResumeData } from "../lib/resume";
import { ResumeType } from "../lib/types";
import Experiences from "../components/resume/Experiences";
import { baseurl } from "../lib/utilities";
import { Albums } from "../components/Albums";

export const getStaticProps: GetStaticProps = async () => {
	const resume: object = getResumeData();
	const albumResponse = await fetch(`${baseurl}/api/albums`);
	const albums = await albumResponse.json();

	return {
		props: {
			resume,
			albums,
		},
	};
};

export default function About(props: {
	resume: ResumeType;
	albums: { title: string; artist: string; image: string }[];
}) {
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
			<Albums albums={props.albums} />
			<section>
				<h2>Resume</h2>

				<Experiences experience={props.resume.experience} />
			</section>
		</>
	);
}
