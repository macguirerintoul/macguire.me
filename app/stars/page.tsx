import { StarsList } from "@/components/StarsList";
import { getStars } from "@/lib/stars";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Stars",
};

export default async function StarsPage() {
	const { stars, nextCursor } = await getStars();

	return <StarsList initialStars={stars} initialNextCursor={nextCursor} />;
}
