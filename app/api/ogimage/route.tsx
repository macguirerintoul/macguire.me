import { ImageResponse, NextRequest } from "next/server";

export const runtime = "edge";

const uncutSansRegular = fetch(
	new URL("public/UncutSans-Regular.otf", import.meta.url)
).then((res) => res.arrayBuffer());

const uncutSansBold = fetch(
	new URL("public/UncutSans-Bold.otf", import.meta.url)
).then((res) => res.arrayBuffer());

export async function GET(request: NextRequest) {
	try {
		const regular = await uncutSansRegular;
		const bold = await uncutSansBold;
		console.log(request.nextUrl.searchParams);

		const title = request.nextUrl.searchParams.get("title");

		let footer = (
			<footer style={{ display: "flex", justifyContent: "space-between" }}>
				<div>Macguire Rintoul</div>
				<div>macguire.me</div>
			</footer>
		);

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
