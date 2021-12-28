import PlausibleProvider from "next-plausible";
import { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { Layout } from "../components";
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";

import "../styles/style.scss";

type NextPageWithLayout = NextPage & {
	getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
	// Use the layout defined at the page level, if available
	const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);

	const layoutedPage = getLayout(<Component {...pageProps} />);

	return (
		<PlausibleProvider
			domain="macguire.me"
			customDomain="https://plausible.macguire.me"
			trackOutboundLinks={true}
			selfHosted={true}
		>
			<ThemeProvider>{layoutedPage}</ThemeProvider>
		</PlausibleProvider>
	);
}
