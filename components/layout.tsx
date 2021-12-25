import Header from "./header";
import Footer from "./footer";

export default function Layout({ children }) {
	return (
		<div id="app">
			<Header />
			<main className="container">{children}</main>
			<div className="container">
				<hr />
			</div>
			<Footer />
		</div>
	);
}
