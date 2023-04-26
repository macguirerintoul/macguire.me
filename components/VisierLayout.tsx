import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Nav, Footer, VisierHero } from "./index";
import { ICommit } from "../lib/types";
import { ReactNode } from "react";

const VisierLayout = ({ children }) => {
	const router = useRouter();
	const [commit, setCommit] = useState<ICommit | undefined>();

	// TODO can this be moved to build-time?
	useEffect(() => {
		fetch("/api/commit")
			.then((response) => response.json())
			.then((commit) => setCommit(commit));
	}, []);

	return (
		<>
			<Nav />
			<div id={router.pathname.substring(1)} className="parallax-container">
				<VisierHero />
				<main className="columns-12 side-padded">{children}</main>
				<Footer commit={commit} />
			</div>
		</>
	);
};

export default VisierLayout;
