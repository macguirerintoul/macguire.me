import { NextResponse } from "next/server";
import { getMusicItems } from "../../../lib/music";

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);
	const type = searchParams.get("type") || "albums";
	const time = searchParams.get("time") || "month";

	const data = await getMusicItems(
		type as "albums" | "artists",
		time as "week" | "month" | "year" | "all",
	);
	return NextResponse.json(data);
}
