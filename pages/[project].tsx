import Layout from "../components/layout";  
import { getStaticProjects, getProjectData } from "../lib/work"; 
import ProjectContent from "../components/projectcontent"
import React from "react";
import { ProjectType } from "../lib/types";

export async function getStaticProps({ params }) {
	const projectData = await getProjectData(params.project); 

	return {
		props: {
			projectData
		},
	};
}

export async function getStaticPaths() {
	const paths: object[] = getStaticProjects();
	return {
		paths,
		fallback: false,
	};
}

class Project extends React.Component<{projectData:ProjectType}> {
	render() {
		return (
			<Layout> 
				<ProjectContent projectData={this.props.projectData}/>
			</Layout>
		);
	}
}
export default Project;
