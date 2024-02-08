import { Metadata } from "next";
import PlausibleProvider from "next-plausible";
import { Footer } from "components/Footer";
import { Nav } from "components/Nav";
import "highlight.js/styles/github.css";
import "react-medium-image-zoom/dist/styles.css";
import { getLatestCommit } from "lib/utilities";
import "styles/globals.css";
import { timesNow } from "lib/utilities";
import Script from "next/script";

export const metadata: Metadata = {
	icons: {
		icon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🥴</text></svg>",
	},
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const commit = await getLatestCommit();

	return (
		<html lang="en" className={timesNow.variable}>
			<Script id="pendo">
				{`
					(function(apiKey){
						(function(p,e,n,d,o){var v,w,x,y,z;o=p[d]=p[d]||{};o._q=o._q||[];
						v=['initialize','identify','updateOptions','pageLoad','track'];for(w=0,x=v.length;w<x;++w)(function(m){
								o[m]=o[m]||function(){o._q[m===v[0]?'unshift':'push']([m].concat([].slice.call(arguments,0)));};})(v[w]);
								y=e.createElement(n);y.async=!0;y.src='https://cdn.pendo.io/agent/static/'+apiKey+'/pendo.js';
								z=e.getElementsByTagName(n)[0];z.parentNode.insertBefore(y,z);})(window,document,'script','pendo');
				})('6c796417-9818-4ce4-54f4-8248b48cdb56');
				`}
			</Script>
			<PlausibleProvider
				domain="macguire.me"
				customDomain="https://plausible.macguire.me"
				trackOutboundLinks={true}
				selfHosted={true}
			>
				<body>
					<Nav />
					<main className="px-6 py-16 sm:px-8 sm:py-32">{children}</main>
					<Footer commit={commit} />
				</body>
			</PlausibleProvider>
		</html>
	);
}
