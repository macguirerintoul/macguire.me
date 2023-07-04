import { Metadata } from "next";
import PlausibleProvider from "next-plausible";
import { Footer, Nav } from "components";
import localFont from "next/font/local";
import "styles/style.scss";
import "highlight.js/styles/github.css";
import "react-medium-image-zoom/dist/styles.css";
import { getLatestCommit } from "lib/utilities";
import "styles/globals.css";

const uncut = localFont({
	src: "../../public/UncutSans-Variable.ttf",
	variable: "--uncut",
});

export const metadata: Metadata = {
	icons: {
		icon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🥴</text></svg>",
	},
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const commit = await getLatestCommit();

	return (
		<html lang="en" className={uncut.variable}>
			<PlausibleProvider
				domain="macguire.me"
				customDomain="https://plausible.macguire.me"
				trackOutboundLinks={true}
				selfHosted={true}
			>
				<body>
					<Nav />
					<main className="px-8 py-16 sm:py-32">{children}</main>
					<Footer commit={commit} />
				</body>
			</PlausibleProvider>
		</html>
	);
}
