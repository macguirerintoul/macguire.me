import { ImageResponse } from "next/og";
import { loadGoogleFont } from "lib/utilities";

export const contentType = "image/png";
export const alt = "Macguire Rintoul";
export const size = {
	width: 1200,
	height: 630,
};

export default async function Image() {
	return new ImageResponse(
		(
			<div
				style={{
					background: "white",
					backgroundSize: "40px 40px",
					backgroundImage:
						"radial-gradient(circle, #efefef 1px, transparent 5%)",
					width: "100%",
					height: "100%",
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
				}}
			>
				<h1
					style={{
						fontSize: 128,
						fontFamily: "Inclusive Sans 600",
						letterSpacing: "-8px",
					}}
				>
					Macguire Rintoul
				</h1>
				<div style={{ fontFamily: "Inclusive Sans 400" }}>
					Designer & developer
				</div>
				<div style={{ fontFamily: "Inclusive Sans 400" }}>macguire.me</div>
			</div>
		),
		{
			...size,
			fonts: [
				{
					name: "Inclusive Sans 400",
					data: await loadGoogleFont("Inclusive Sans:wght@400", alt),
					style: "normal",
					weight: 400,
				},
				{
					name: "Inclusive Sans 600",
					data: await loadGoogleFont("Inclusive Sans:wght@600", alt),
					style: "normal",
					weight: 600,
				},
			],
		},
	);
}
