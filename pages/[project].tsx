import { GetStaticProps } from "next";
import React from "react";
import { ParsedUrlQuery } from "querystring";
import { getStaticProjects, getProjectData } from "../lib/content";
import { ProjectContent } from "../components";
import { IProject } from "../lib/types";

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

class Project extends React.Component<{ projectData: IProject }> {
	render() {
		return <ProjectContent project={this.props.projectData} />;
	}
}
export default Project;
