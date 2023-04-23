import PlausibleProvider from "next-plausible";
import App from "next/app";
import { Layout } from "../components";
import "../styles/style.scss";
import "../node_modules/highlight.js/styles/github-dark.css";

const MyApp = ({ Component, pageProps }) => {
	return (
		<PlausibleProvider
			domain="macguire.me"
			customDomain="https://plausible.macguire.me"
			trackOutboundLinks={true}
			selfHosted={true}
		>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</PlausibleProvider>
	);
};

export default MyApp;
