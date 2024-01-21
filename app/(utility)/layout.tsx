import "styles/globals.css";
import { timesNow } from "lib/utilities";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={timesNow.variable}>
			<body>{children}</body>
		</html>
	);
}
