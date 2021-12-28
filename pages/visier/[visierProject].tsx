import ProjectContent from "../../components/projectcontent";
import * as React from "react";
import { IProjectParams, ProjectType } from "../../lib/types";
import { getProjectData, getVisierWorkIds } from "../../lib/content";
import { GetStaticProps } from "next";

export async function getStaticPaths() {
	const paths = getVisierWorkIds();
	return {
		paths,
		fallback: false,
	};
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { visierProject } = params as IProjectParams;
	const projectData = await getProjectData("visier/" + visierProject);

	return {
		props: {
			projectData,
		},
	};
};

class VisierProject extends React.Component<{ projectData: ProjectType }> {
	render() {
		return <ProjectContent projectData={this.props.projectData} />;
	}
}

export default VisierProject;
