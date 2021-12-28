import Head from "next/head";
import { ListBlock } from "../components";
import { getAllProjectSummaries } from "../lib/content";
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
		<>
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
		</>
	);
}
