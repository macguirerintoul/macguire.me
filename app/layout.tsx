import { Metadata } from "next";
import { Footer, Nav } from "../components";
import "../styles/style.scss";
import "highlight.js/styles/github.css";

export const metadata: Metadata = {
	title: "Home",
	description: "Welcome to Next.js",
	icons: {
		icon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🥴</text></svg>",
		shortcut: "/shortcut-icon.png",
		apple: "/apple-icon.png",
		other: {
			rel: "apple-touch-icon-precomposed",
			url: "/apple-touch-icon-precomposed.png",
		},
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	// const [commit, setCommit] = useState<ICommit | undefined>();
	// const router = useRouter();

	const commit = fetch("/api/commit")
		.then((response) => response.json())
		.then((commit) => commit)
		.catch((error) => {
			console.error(error);
		});

	return (
		<html lang="en">
			<body id="id">
				<Nav />
				<main className="side-padded">{children}</main>
				<Footer commit={commit} />
			</body>
		</html>
	);
}
