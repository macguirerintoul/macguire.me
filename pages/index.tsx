import Head from "next/head";
import Layout from "../components/layout";
import { getAllProjects } from "../lib/work"; 
import ListBlock from "../components/listblock";
import { GetStaticProps} from "next"

export const getStaticProps: GetStaticProps = async () => {
	const allPostsData = getAllProjects();
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
				<ListBlock key={item.title} title={item.title} url={item.url} description={item.description} />
			))}
		</Layout>
	);
}
