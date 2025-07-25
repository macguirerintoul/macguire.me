import { Metadata } from "next";
import { getLatestCommit } from "lib/utilities";
import "styles/globals.css";
import "react-medium-image-zoom/dist/styles.css";
import { Cmdk } from "components/Cmdk";
import { Sidebar } from "@/components/Sidebar";
import { Inclusive_Sans } from "next/font/google";
import { Inter } from "next/font/google";
import { GeistMono } from "geist/font/mono";

const inclusiveSans = Inclusive_Sans({ weight: "400", subsets: ["latin"] });

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

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
		<html lang="en" className={`${GeistMono.variable} ${inter.variable}`}>
			<body className="flex">
				<Sidebar commit={commit} />
				<main className="grow bg-neutral-50 py-8 dark:bg-black">
					{children}
				</main>
				<Cmdk />
			</body>
		</html>
	);
}
