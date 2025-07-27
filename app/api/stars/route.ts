import { getStars } from "lib/github";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
	const { searchParams } = new URL(request.url);
	const page = searchParams.get("page");
	const pageNumber = page ? parseInt(page) : 1;

	const { stars, nextPage } = await getStars(pageNumber, 100);

	return NextResponse.json({
		stars,
		nextPage,
	});
};
