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
	);
};

export default MyApp;
