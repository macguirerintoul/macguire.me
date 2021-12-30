import { ProjectContent } from "../../components";
import * as React from "react";
import { IProjectParams, IProject } from "../../lib/types";
import { getProjectData, getVisierWorkIds } from "../../lib/content";
import { GetStaticProps } from "next";

import Visier from "../../content/images/Visier.png";

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

class VisierProject extends React.Component<{ projectData: IProject }> {
	render() {
		return <ProjectContent project={this.props.projectData} imgSrc={Visier} />;
	}
}

export default VisierProject;
