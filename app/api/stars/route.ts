import { getStars } from "lib/stars";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
	const { searchParams } = new URL(request.url);
	const cursor = searchParams.get("cursor");
	const pageSize = searchParams.get("pageSize");

	const { stars, nextCursor } = await getStars(
		cursor || undefined,
		pageSize ? parseInt(pageSize) : 100,
	);

	return NextResponse.json({
		stars,
		nextCursor,
	});
};
