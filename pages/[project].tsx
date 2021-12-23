import Layout from "../components/layout";  
import { getStaticProjects, getProjectData } from "../lib/work"; 
import ProjectContent from "../components/projectcontent"
import React from "react"; 
import { serialize } from "next-mdx-remote/serialize"; 

export async function getStaticProps({ params }) {
	const project = await getProjectData(params.project);
	const mdxSource = await serialize(project.content);
	const process = await serialize(project.process);

	return {
		props: {
			project:{
				meta: project.data,
				content: mdxSource,
				process: process,
			},
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

class Project extends React.Component<{project:Project}> {
	render() {
		return (
			<Layout> 
				<ProjectContent project={this.props.project}/>
			</Layout>
		);
	}
}
export default Project;
