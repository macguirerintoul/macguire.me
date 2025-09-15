import { LinksList } from "@/components/LinksList";
import { getLinks, getAvailableTags } from "@/lib/links";
import { Metadata } from "next";

export const revalidate = 86400;
export const metadata: Metadata = {
	title: "Links",
};

export default async function LinksPage() {
	const [{ links, nextCursor }, availableTags] = await Promise.all([
		getLinks(),
		getAvailableTags(),
	]);

	return (
		<>
			<h1>Links</h1>
			<hr />
			<LinksList
				initialLinks={links}
				initialNextCursor={nextCursor}
				availableTags={availableTags}
			/>
		</>
	);
}
