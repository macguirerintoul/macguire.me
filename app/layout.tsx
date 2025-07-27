import { Metadata } from "next";
import { getLatestCommit } from "lib/utilities";
import "react-medium-image-zoom/dist/styles.css";
import "styles/globals.css";
import { Cmdk } from "components/Cmdk";
import { Sidebar } from "@/components/Sidebar";
import { Inter } from "next/font/google";
import { GeistMono } from "geist/font/mono";

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
			<body className="flex bg-neutral-50 dark:bg-black dark:text-neutral-100">
				<Sidebar commit={commit} />
				<main className="my-12 grow">{children}</main>
				<Cmdk />
			</body>
		</html>
	);
}
