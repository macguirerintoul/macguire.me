import Layout from "../components/layout";
import { getStaticProjects, getProjectData } from "../lib/work";
import ProjectContent from "../components/projectcontent";
import React from "react";
import { ProjectType } from "../lib/types";
import { GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";

interface IParams extends ParsedUrlQuery {
	project: string;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { project } = params as IParams;
	const projectData = await getProjectData(project);

	return {
		props: {
			projectData,
		},
	};
};

export async function getStaticPaths() {
	const paths: object[] = getStaticProjects();
	return {
		paths,
		fallback: false, // 404 paths that don't match a project
	};
}

class Project extends React.Component<{ projectData: ProjectType }> {
	render() {
		return (
			<Layout>
				<ProjectContent projectData={this.props.projectData} />
			</Layout>
		);
	}
}
export default Project;
