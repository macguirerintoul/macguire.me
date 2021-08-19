import Head from "next/head";
import Layout from "../components/layout";
import { getWork } from "../lib/work";
import Spacer from "../components/spacer";
import MagicLink from "../components/magiclink";
import TDTBlock from "../components/listblock";

export async function getStaticProps() {
	const allPostsData = getWork();
	return {
		props: {
			allPostsData,
		},
	};
}

export default function Home({ allPostsData }) {
	return (
		<Layout>
			<Head>
				<title>Macguire Rintoul</title>
			</Head>

			<div className="hero">
				<p className="hero-paragraph">What are you looking for today?</p>
				<div className="hero-links">
					<span>
						✦{" "}
						<MagicLink url="/service/experience-design">
							Experience Design
						</MagicLink>
					</span>
					<span>
						✦{" "}
						<MagicLink url="/service/software-development">
							Software Development
						</MagicLink>
					</span>
					<span>
						✦{" "}
						<MagicLink url="/service/system-administration">
							System Administration
						</MagicLink>
					</span>
				</div>
			</div>

			<h1>Selected work</h1>

			<hr />
			<div className="project-flex-container">
				{allPostsData.map((item) => (
					<TDTBlock key={item.title} item={item} />
				))}
			</div>
		</Layout>
	);
}
