import { GetStaticProps } from "next";
import React from "react";
import Balancer from "react-wrap-balancer";
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
			<article>
				<h1>
					<Balancer>{this.props.path.meta.title}</Balancer>
				</h1>
				<MDXRemote {...this.props.path.mdx} />
			</article>
		);
	}
}
export default Project;
