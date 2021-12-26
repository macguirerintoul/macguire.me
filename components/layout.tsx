import Header from "./header";
import Footer from "./footer";
import { ReactNode } from "react";

export default function Layout(props: { children: ReactNode }) {
	return (
		<div id="app">
			<Header />
			<main className="container">{props.children}</main>
			<Footer />
		</div>
	);
}
