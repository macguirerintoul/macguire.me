import { ReactNode, useEffect, useState } from "react";
import { Footer, Header } from "./index";
import { ICommit } from "../lib/types";

export default function Layout(props: { children: ReactNode }) {
	const [commit, setCommit] = useState<ICommit | undefined>();

	useEffect(() => {
		fetch("/api/commit")
			.then((response) => response.json())
			.then((commit) => setCommit(commit));
	}, []);

	return (
		<div id="app">
			<Header />
			<main className="container">{props.children}</main>
			<Footer commit={commit} />
		</div>
	);
}
