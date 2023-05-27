import { Metadata } from "next";
import PlausibleProvider from "next-plausible";
import { Footer, Nav } from "components";
import localFont from "next/font/local";
import "styles/style.scss";
import "highlight.js/styles/github.css";
import "react-medium-image-zoom/dist/styles.css";
import { getLatestCommit } from "lib/utilities";

const uncut = localFont({ src: "../public/UncutSans-Variable.ttf" });

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
		<html lang="en" className={uncut.className}>
			<PlausibleProvider
				domain="macguire.me"
				customDomain="https://plausible.macguire.me"
				trackOutboundLinks={true}
				selfHosted={true}
			>
				<body>
					<Nav />
					<main>{children}</main>
					<Footer commit={commit} />
				</body>
			</PlausibleProvider>
		</html>
	);
}
