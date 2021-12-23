import Layout from "../../components/layout";
import ProjectContent from "../../components/projectcontent"
import React from "react";
import { ProjectType } from "../../lib/types";
import { getProjectData, getVisierWorkIds } from "../../lib/work";  

export async function getStaticPaths() {
	const paths = getVisierWorkIds();
	return {
		paths,
		fallback: false,
	};
}

export async function getStaticProps({ params }) {
	const projectData = await getProjectData("visier/" + params.visierProject); 

	return {
		props: {
		projectData
		},
	};
}

class VisierProject extends React.Component<{projectData:ProjectType}> {
  render() {
		return (
			<Layout>
				<ProjectContent projectData={this.props.projectData} />
      </Layout>
    )
    }
}

export default VisierProject