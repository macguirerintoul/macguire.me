import { NextRequest, NextResponse } from "next/server";
import { getLinks, getAvailableTags } from "@/lib/links";

export const GET = async (request: NextRequest) => {
	try {
		const { searchParams } = new URL(request.url);
		const cursor = searchParams.get("cursor");
		const tag = searchParams.get("tag");
		const tagsOnly = searchParams.get("tagsOnly");

		// If tagsOnly is requested, return only available tags
		if (tagsOnly === "true") {
			const tags = await getAvailableTags();
			return NextResponse.json(
				{ tags },
				{
					headers: {
						// cache on browser only
						"Cache-Control": "public, max-age=86400",
					},
				},
			);
		}

		const { links, nextCursor } = await getLinks(
			cursor || undefined,
			100,
			tag || undefined,
		);

		return NextResponse.json(
			{
				links,
				nextCursor,
			},
			{
				headers: {
					// cache on browser only
					"Cache-Control": "public, max-age=86400",
				},
			},
		);
	} catch (error) {
		console.error("Error fetching links:", error);
		return NextResponse.json(
			{
				error: "Failed to fetch links",
				details: error instanceof Error ? error.message : "Unknown error",
			},
			{ status: 500 },
		);
	}
};
