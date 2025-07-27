import { NextRequest, NextResponse } from "next/server";
import { getLinks } from "@/lib/links";

export const GET = async (request: NextRequest) => {
	const { searchParams } = new URL(request.url);
	const cursor = searchParams.get("cursor");
	const pageSize = searchParams.get("pageSize");

	const { links, nextCursor } = await getLinks(
		cursor || undefined,
		pageSize ? parseInt(pageSize) : 100,
	);

	return NextResponse.json({
		links,
		nextCursor,
	});
};
