import React from "react";
import { getAlbums } from "lib/albums";
import { Albums } from "components/Albums";
import { Album } from "types";
import { Metadata } from "next";
import { titleTemplate } from "lib/utilities";

export const revalidate = 86400;

export const metadata: Metadata = {
	title: "Music " + titleTemplate,
};

export default async function About() {
	const albums: Album[] = await getAlbums();

	return (
		<>
			<section>
				<h1>Music</h1>
				<hr />
			</section>
			<Albums albums={albums} />
		</>
	);
}
