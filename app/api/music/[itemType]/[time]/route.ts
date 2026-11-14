import { NextResponse } from "next/server";
import { getMusicItems } from "lib/music";

export const revalidate = 86400;

export async function generateStaticParams() {
	const itemTypes = ["album", "artist"];
	const times = ["week", "month", "year", "all"];
	return itemTypes.flatMap((itemType) =>
		times.map((time) => ({
			itemType,
			time,
		})),
	);
}

export async function GET(
	request: Request, // The first argument is the Request object
	{
		params,
	}: {
		params: Promise<{
			itemType: string;
			time: string;
		}>;
	},
) {
	// params is correctly passed as part of the second argument
	const { itemType, time } = await params;
	const data = await getMusicItems(itemType, time);
	return NextResponse.json(data);
}
