import { ReactNode, useEffect, useState } from "react";
import { Footer, Nav } from "./index";
import { ICommit } from "../lib/types";
import { useRouter } from "next/router";

export default function Layout(props: { children: ReactNode }) {
	const [commit, setCommit] = useState<ICommit | undefined>();
	const router = useRouter();

	// TODO can this be moved to build-time?
	useEffect(() => {
		fetch("/api/commit")
			.then((response) => response.json())
			.then((commit) => setCommit(commit));
	}, []);

	return (
		// remove the / from pathname
		<div id={router.pathname.substring(1)}>
			<Nav />
			{/* 
				Everything between the header and footer is in a 12-column grid 
				"The <main> HTML element represents the dominant content of the <body> of a document."
				https://developer.mozilla.org/en-US/docs/Web/HTML/Element/main
			*/}
			<main className="columns-12 side-padded">{props.children}</main>
			<Footer commit={commit} />
		</div>
	);
}
