import localFont from "next/font/local";
import "styles/globals.css";

const aspekta = localFont({
	src: "../../public/AspektaVF.ttf",
	variable: "--aspekta",
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={aspekta.variable}>
			<body>{children}</body>
		</html>
	);
}
