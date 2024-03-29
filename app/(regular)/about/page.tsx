import React from "react";
import { getResumeData } from "lib/resume";
import Experiences from "components/resume/Experiences";
import { getAlbums } from "lib/albums";
import { Albums } from "components/Albums";
import { Resume, Album } from "types";
import { Metadata } from "next";
import { titleTemplate } from "lib/utilities";

export const metadata: Metadata = {
	title: "About " + titleTemplate,
};

export default async function About() {
	const resume: Resume = getResumeData();
	const albums: Album[] = await getAlbums();

	return (
		<>
			<section>
				<h1>About</h1>
				<hr />
				<h2 className="mb-0">Now playing</h2>
				<p className="text-xl  text-neutral-500">
					via <a href="https://www.last.fm/user/macguirerintoul">Last.fm</a>
				</p>
			</section>
			<Albums albums={albums} />
			<section className="mt-12">
				<h2>Resume</h2>
				<Experiences experience={resume.experience} />
			</section>
		</>
	);
}
