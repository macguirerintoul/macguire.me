import { Metadata } from "next";
import PlausibleProvider from "next-plausible";
import { Footer } from "components/Footer";
import { Nav } from "components/Nav";
import "react-medium-image-zoom/dist/styles.css";
import { getLatestCommit } from "lib/utilities";
import "styles/globals.css";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { MotionConfig } from "motion/react";
import { Cmdk } from "components/Cmdk";

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
		<html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
			<PlausibleProvider
				domain="macguire.me"
				customDomain="https://plausible.macguire.me"
				trackOutboundLinks={true}
				selfHosted={true}
			>
				<MotionConfig reducedMotion="user">
					<body>
						<Nav />
						<main className="px-6 py-16 sm:px-8 sm:py-32">{children}</main>
						<Footer commit={commit} />
						<Cmdk />
					</body>
				</MotionConfig>
			</PlausibleProvider>
		</html>
	);
}
