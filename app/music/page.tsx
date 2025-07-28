import React from "react";
import { MusicComponent } from "components/MusicComponent";
import { Metadata } from "next";
import { titleTemplate } from "lib/utilities";
import { getMusicItems } from "lib/music";

export const revalidate = 86400;
export const metadata: Metadata = {
	title: "Music " + titleTemplate,
};

export default async function Music() {
	const initialMusicItems = await getMusicItems("album", "month");
	return (
		<>
			<h1>Music</h1>
			<hr />
			<MusicComponent initialMusicItems={initialMusicItems} />
		</>
	);
}
