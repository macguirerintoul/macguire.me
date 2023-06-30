import { GetStaticProps } from "next";
import React from "react";
import type { StaticImageData } from "next/image";
import { ParsedUrlQuery } from "querystring";
import { getStaticProjects, getProject } from "lib/project";
import { ProjectContent } from "./ProjectContent";
import { Project } from "types";

import visier from "../content/images/visier.png";
import forecast from "../content/images/forecast.png";
import mycredit from "../content/images/mycredit.jpg";
import roar from "../content/images/roar.jpg";
import theSwitch from "../content/images/the-switch.jpg";
import winebox from "../content/images/winebox.jpg";

const featuredImages: Record<string, StaticImageData> = {
	visier: visier,
	forecast: forecast,
	mycredit: mycredit,
	roar: roar,
	"the-switch": theSwitch,
	winebox: winebox,
};

interface IParams extends ParsedUrlQuery {
	project: string;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { project } = params as IParams;
	const projectData = await getProject(project);

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

class ProjectPage extends React.Component<{ projectData: Project }> {
	render() {
		return (
			<ProjectContent
				project={this.props.projectData}
				imgSrc={featuredImages[this.props.projectData.id]}
			/>
		);
	}
}
export default ProjectPage;
