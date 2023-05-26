import { NextRequest } from "next/server";

export const runtime = "edge";

const uncutSansRegular = fetch(
	new URL("public/UncutSans-Regular.otf", import.meta.url)
).then((res) => res.arrayBuffer());

const uncutSansBold = fetch(
	new URL("public/UncutSans-Bold.otf", import.meta.url)
).then((res) => res.arrayBuffer());

export default async function handler(req: NextRequest) {
	try {
		const regular = await uncutSansRegular;
		const bold = await uncutSansBold;

		// ?title=<title>
		const { searchParams } = new URL(req.url);
		const hasTitle = searchParams.has("title");
		let title = hasTitle
			? searchParams.get("title")?.slice(0, 100)
			: "macguire.me";

		let footer = (
			<footer style={{ display: "flex", justifyContent: "space-between" }}>
				<div>Macguire Rintoul</div>
				<div>macguire.me</div>
			</footer>
		);

		if (searchParams.get("variant") === "visier") {
			title = "Visier People";
			footer = <div />;
		}

		const element = (
			<div
				style={{
					backgroundColor: "#fff",
					backgroundSize: "40px 40px",
					backgroundImage:
						"radial-gradient(circle, #efefef 1px, transparent 5%)",
					height: "100%",
					width: "100%",
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					flexWrap: "nowrap",
					fontSize: 40,
					fontStyle: "normal",
					fontFamily: "regular",
					color: "000",
					padding: "32px 32px",
					lineHeight: 1.4,
				}}
			>
				<div
					style={{
						fontSize: 120,
						fontFamily: "bold",
						lineHeight: 1,
						letterSpacing: -3,
					}}
				>
					{title}
				</div>

				{footer}
			</div>
		);

		return new ImageResponse(element, {
			width: 1200,
			height: 630,
			fonts: [
				{
					name: "regular",
					data: regular,
					style: "normal",
				},
				{
					name: "bold",
					data: bold,
					style: "normal",
				},
			],
		});
	} catch (e: unknown) {
		console.log(`${e}`);
		return new Response(`Failed to generate the image`, {
			status: 500,
		});
	}
}
