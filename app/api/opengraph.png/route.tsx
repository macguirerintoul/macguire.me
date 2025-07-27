import { ImageResponse } from "next/og";
import { loadGoogleFont } from "lib/utilities";

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url);
		const name = "Macguire Rintoul";
		const description = "Designer & Developer";
		const url = "macguire.me";
		const title =
			searchParams.get("title")?.slice(0, 100) ?? "Macguire Rintoul";
		const subtitle =
			searchParams.get("subtitle")?.slice(0, 100) ?? "Designer & Developer";

		const usedText = title + subtitle + name + url + description;

		return new ImageResponse(
			(
				<div tw="bg-white w-full p-8 h-full flex flex-col justify-between">
					<div tw="flex flex-col">
						<h1
							tw="text-8xl tracking-tight leading-none"
							style={{
								fontFamily: "Inclusive Sans 600",
							}}
						>
							{title}
						</h1>
						<div tw="text-5xl" style={{ fontFamily: "Inclusive Sans 400" }}>
							{subtitle}
						</div>
					</div>
					<div tw="text-4xl flex" style={{ fontFamily: "Inclusive Sans 400" }}>
						{name} • {description} • {url}
					</div>
				</div>
			),
			{
				width: 1200,
				height: 630,
				fonts: [
					{
						name: "Inclusive Sans 400",
						data: await loadGoogleFont("Inclusive Sans:wght@400", usedText),
						style: "normal",
						weight: 400,
					},
					{
						name: "Inclusive Sans 600",
						data: await loadGoogleFont("Inclusive Sans:wght@600", usedText),
						style: "normal",
						weight: 600,
					},
				],
			},
		);
	} catch (error) {
		console.error("Error generating Open Graph image:", error);
		return new Response("Internal Server Error", { status: 500 });
	}
}
