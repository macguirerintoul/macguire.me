import Layout from "../../components/layout";
import ProjectContent from "../../components/projectcontent"
import React from "react";
import { getProjectData, getVisierWorkIds } from "../../lib/work"; 
import { serialize } from "next-mdx-remote/serialize";

export async function getStaticPaths() {
	const paths = getVisierWorkIds();
	return {
		paths,
		fallback: false,
	};
}

export async function getStaticProps({ params }) {
	const project = await getProjectData("visier/" + params.visierProject);
	const mdxSource = await serialize(project.content);
	const process = await serialize(project.process);

	return {
		props: {
			project: {
				meta: project.data,
				content: mdxSource,
				process: process,
			},
		},
	};
}

class VisierProject extends React.Component {
  render() {
		return (
			<Layout>
				<ProjectContent project={this.props.project} />
      </Layout>
    )
    }
}

export default VisierProject