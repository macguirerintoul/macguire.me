import PlausibleProvider from "next-plausible";
import {AppProps} from "next/app"
import { ThemeProvider } from 'next-themes'

import "../styles/style.scss";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<PlausibleProvider
			domain="macguire.me"
			customDomain="https://plausible.macguire.me"
			trackOutboundLinks={true}
			selfHosted={true}
		>
			<ThemeProvider>
				<Component {...pageProps} />
			</ThemeProvider>
		</PlausibleProvider>
	);
}