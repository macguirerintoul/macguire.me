import { Metadata } from "next";
import "react-medium-image-zoom/dist/styles.css";
import { getLatestCommit } from "lib/utilities";
import "styles/globals.css";
import { MotionConfig } from "motion/react";
import { Cmdk } from "components/Cmdk";
import { Sidebar } from "@/components/Sidebar";

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
		<html lang="en">
			<MotionConfig reducedMotion="user">
				<body className="flex">
					<Sidebar commit={commit} />
					<main className="grow overflow-auto px-6 py-16 sm:px-8 sm:py-32">
						{children}
					</main>
					<Cmdk />
				</body>
			</MotionConfig>
		</html>
	);
}
