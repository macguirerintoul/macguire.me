import { LinksList } from "@/components/LinksList";
import { getBaseDomain } from "@/lib/utilities";
import { getLinks, getAvailableTags } from "@/lib/links";
import { Metadata } from "next";
import twas from "twas";

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
		<LinksList
			initialLinks={links.map((link) => ({
				...link,
				subtitle: getBaseDomain(link.href),
				rightSide: twas(new Date(link.created).valueOf()),
			}))}
			initialNextCursor={nextCursor}
			availableTags={availableTags}
		/>
	);
}
