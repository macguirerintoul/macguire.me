import PlausibleProvider from "next-plausible";
import { Layout } from "../components";
import "../styles/style.scss";
import "../node_modules/highlight.js/styles/github-dark.css";
import localFont from "next/font/local";

const uncut = localFont({ src: "../public/UncutSans-Variable.ttf" });

const MyApp = ({ Component, pageProps }) => {
	// Use the layout defined at the page level, if available
	const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

	return (
		<PlausibleProvider
			domain="macguire.me"
			customDomain="https://plausible.macguire.me"
			trackOutboundLinks={true}
			selfHosted={true}
		>
			{getLayout(
				<>
					<style jsx global>{`
						:root {
							--uncut: ${uncut.style.fontFamily};
						}
					`}</style>
					<Component {...pageProps} />
				</>
			)}
		</PlausibleProvider>
	);
};

export default MyApp;
