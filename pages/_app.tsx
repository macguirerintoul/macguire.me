import PlausibleProvider from "next-plausible";
import { Layout } from "../components";
import "../styles/style.scss";
import "../node_modules/highlight.js/styles/github-dark.css";
import "react-medium-image-zoom/dist/styles.css";
import localFont from "next/font/local";
import { ReactNode } from "react";
import { AppProps } from "next/app";
import { NextPage } from "next";
import { ReactElement } from "react";
import { MotionConfig } from "framer-motion";
import Head from "next/head";

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
	getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

const uncut = localFont({ src: "../public/UncutSans-Variable.ttf" });

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
	// Use the layout defined at the page level, if it has been defined
	const getLayout =
		Component.getLayout || ((page: ReactNode) => <Layout>{page}</Layout>);

	return (
		<>
			<Head>
				<link
					rel="icon"
					href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🥴</text></svg>"
				/>
			</Head>
			<PlausibleProvider
				domain="macguire.me"
				customDomain="https://plausible.macguire.me"
				trackOutboundLinks={true}
				selfHosted={true}
			>
				<MotionConfig reducedMotion="user">
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
				</MotionConfig>
			</PlausibleProvider>
		</>
	);
};

export default MyApp;
