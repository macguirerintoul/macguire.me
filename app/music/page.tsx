import React from "react";
import { MusicComponent } from "components/MusicComponent";
import { Metadata } from "next";
import { titleTemplate } from "lib/utilities";
import { getMusicItems } from "../../lib/music";

export const revalidate = 86400;

export const metadata: Metadata = {
	title: "Music " + titleTemplate,
};

export default async function Music() {
	const initialData = await getMusicItems("albums", "month");
	return (
		<>
			<h1>Music</h1>
			<hr />
			<MusicComponent initialData={initialData} />
		</>
	);
}
