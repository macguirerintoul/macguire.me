// import { ProjectContent } from "../../components";
import * as React from "react";
// import type { StaticImageData } from "next/image";
import { ProjectParams, Project } from "types";
import { getProject, getVisierWorkIds } from "lib/project";
import { GetStaticProps } from "next";

// import sourcingPaths from "../../content/images/visier/sourcing-paths.png";
// import scatterPlot from "../../content/images/visier/scatter-plot.png";

// const featuredImages: Record<string, StaticImageData> = {
// 	"visier/sourcing-paths": sourcingPaths,
// 	"visier/scatter-plot": scatterPlot,
// };

export async function getStaticPaths() {
	const paths = getVisierWorkIds();
	return {
		paths,
		fallback: false,
	};
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { visierProject } = params as ProjectParams;
	const projectData = await getProject("visier/" + visierProject);

	return {
		props: {
			projectData,
		},
	};
};

class VisierProject extends React.Component<{ projectData: Project }> {
	render() {
		return (
			<>
				{/* <ProjectContent
					project={this.props.projectData}
					imgSrc={featuredImages[this.props.projectData.id]}
				/> */}
			</>
		);
	}
}

export default VisierProject;
