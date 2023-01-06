import { GetStaticProps } from "next";
import React from "react";

import { MDXRemote } from "next-mdx-remote";

import { getPost, getPostSlugs } from "../../lib/content";

export async function getStaticPaths() {
	const paths = getPostSlugs();
	return {
		paths,
		fallback: false, // 404 paths that don't match a post
	};
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { post } = params as IParams;
	const path = await getPost(post);

	return {
		props: {
			path,
		},
	};
};

class Project extends React.Component<{ path }> {
	render() {
		return (
			<div>
				<h1>{this.props.path.id}</h1>
				<MDXRemote {...this.props.path.mdx} />
			</div>
		);
	}
}
export default Project;
