import Layout from "../../components/layout";
import ProjectOverview from "../../components/projectoverview"
import React from "react";
import { getProjectData, getVisierWorkIds } from "../../lib/work";
import { MDXRemote } from "next-mdx-remote";
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
			meta: project.data,
			content: mdxSource,
			process: process,
		},
	};
}

class VisierProject extends React.Component {
  render() {
		return (
			<Layout>
				<ProjectOverview project={this.props.meta} />
      </Layout>
    )
    }
}

export default VisierProject