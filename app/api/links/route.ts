import { NextRequest, NextResponse } from "next/server";
import { getLinks, getAvailableTags } from "@/lib/links";

export const GET = async (request: NextRequest) => {
	try {
		const { searchParams } = new URL(request.url);
		const cursor = searchParams.get("cursor");
		const pageSize = searchParams.get("pageSize");
		const tag = searchParams.get("tag");
		const tagsOnly = searchParams.get("tagsOnly");

		// If tagsOnly is requested, return only available tags
		if (tagsOnly === "true") {
			const tags = await getAvailableTags();
			return NextResponse.json(
				{ tags },
				{
					// todo reuse
					headers: {
						"Cache-Control":
							"public, max-age=86400, s-maxage=86400, stale-while-revalidate=3600",
					},
				},
			);
		}

		const { links, nextCursor } = await getLinks(
			cursor || undefined,
			pageSize ? parseInt(pageSize) : 100,
			tag || undefined,
		);

		return NextResponse.json(
			{
				links,
				nextCursor,
			},
			{
				headers: {
					"Cache-Control":
						"public, max-age=86400, s-maxage=86400, stale-while-revalidate=3600",
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
