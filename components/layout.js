import Header from './header'
import Footer from './footer'
import Script from 'next/script'

export default function Layout({ children }) {
  return (
		<div id="app">
			<Header />
			<main className="container">
				{children}
			</main>
			<div className="container">
				<hr />
			</div>
			<Footer />

			<Script src="/theme.js" />
		</div>
	)
}
