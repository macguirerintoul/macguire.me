import localFont from "next/font/local";
import "styles/style.scss";
import "styles/globals.css";

const uncut = localFont({
	src: "../../public/UncutSans-Variable.ttf",
	variable: "--uncut",
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={uncut.variable}>
			<body>{children}</body>
		</html>
	);
}
