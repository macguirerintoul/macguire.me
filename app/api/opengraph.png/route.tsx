import { ImageResponse } from "next/og";
import { loadGoogleFont } from "lib/utilities";
// todo figure out if this is being cached properly
export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url);
		const name = "Macguire Rintoul";
		const description = "Designer & Developer";
		const title = searchParams.get("title")?.slice(0, 100) ?? "macguire.me";

		return new ImageResponse(
			(
				<div
					tw=" text-[#0000ff] w-full p-8 h-full flex flex-col justify-between"
					style={{
						background: "white",
						backgroundSize: "24px 24px",
						backgroundImage:
							"radial-gradient(circle, #eee 8px, transparent 10%)",
					}}
				>
					<h1
						tw="text-9xl tracking-tighter leading-[90%]"
						style={{
							fontFamily: "Inclusive Sans 700",
						}}
					>
						{title}
					</h1>

					<div tw="text-6xl flex flex-col">
						<div style={{ fontFamily: "Inclusive Sans 600" }}>{name}</div>
						<div style={{ fontFamily: "Inclusive Sans 400" }}>
							{description}
						</div>
					</div>
				</div>
			),
			{
				width: 1200,
				height: 630,
				fonts: [
					{
						name: "Inclusive Sans 400",
						data: await loadGoogleFont("Inclusive Sans:wght@400", description),
						style: "normal",
						weight: 400,
					},
					{
						name: "Inclusive Sans 600",
						data: await loadGoogleFont("Inclusive Sans:wght@600", name),
						style: "normal",
						weight: 600,
					},
					{
						name: "Inclusive Sans 700",
						data: await loadGoogleFont("Inclusive Sans:wght@700", title),
						style: "normal",
						weight: 700,
					},
				],
			},
		);
	} catch (error) {
		console.error("Error generating Open Graph image:", error);
		return new Response("Internal Server Error", { status: 500 });
	}
}
