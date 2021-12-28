import Header from "./header";
import Footer from "./footer";
import { ReactNode } from "react";

export default function Layout(props: {
	children: ReactNode;
	github: { url: string; timestamp: string };
}) {
	return (
		<div id="app">
			<Header />
			<main className="container">{props.children}</main>
			<Footer github={props.github} />
		</div>
	);
}
