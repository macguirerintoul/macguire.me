import PlausibleProvider from "next-plausible";
import "../styles/style.scss";

export default function App({ Component, pageProps }) {
	return (
		<PlausibleProvider
			domain="macguire.me"
			customDomain="https://plausible.macguire.me"
			trackOutboundLinks={true}
			selfHosted={true}
		>
			<Component {...pageProps} />
		</PlausibleProvider>
	);
}
