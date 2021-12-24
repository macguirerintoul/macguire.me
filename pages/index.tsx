import Head from "next/head";
import Layout from "../components/layout";
import { getAllProjectSummaries } from "../lib/work";
import ListBlock from "../components/listblock";
import { GetStaticProps } from "next";
import { ProjectSummaryInterface } from "../lib/types";

export const getStaticProps: GetStaticProps = async () => {
	const projectSummaries: ProjectSummaryInterface[] = getAllProjectSummaries();

	return {
		props: {
			projectSummaries,
		},
	};
};

export default function Home(props: {
	projectSummaries: ProjectSummaryInterface[];
}) {
	return (
		<Layout>
			<Head>
				<title>Macguire Rintoul</title>
			</Head>

			{props.projectSummaries.map((item: ProjectSummaryInterface) => (
				<ListBlock
					key={item.title}
					title={item.title}
					url={item.url}
					description={item.description}
				/>
			))}
		</Layout>
	);
}
