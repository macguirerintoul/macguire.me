import { ProjectContent } from "../../components";
import * as React from "react";
import { IProjectParams, IProject } from "../../lib/types";
import { getProjectData, getVisierWorkIds } from "../../lib/content";
import { GetStaticProps } from "next";

import sourcingPaths from "../../content/images/visier/sourcing-paths.png";
import scatterPlot from "../../content/images/visier/scatter-plot.png";

const featuredImages: Record<string, StaticImageData> = {
	"visier/sourcing-paths": sourcingPaths,
	"visier/scatter-plot": scatterPlot,
};

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
		return (
			<ProjectContent
				project={this.props.projectData}
				imgSrc={featuredImages[this.props.projectData.id]}
			/>
		);
	}
}

export default VisierProject;
