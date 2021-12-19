import Head from "next/head";
import Layout from "../components/layout";
import { getWork } from "../lib/work";
import Spacer from "../components/spacer";
import MagicLink from "../components/magiclink";
import ListBlock from "../components/listblock";

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

			{allPostsData.map((item) => (
				<ListBlock key={item.title} item={item} />
			))}
		</Layout>
	);
}
