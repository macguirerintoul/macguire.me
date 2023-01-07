import { GetStaticProps } from "next";
import React from "react";
import Balancer from "react-wrap-balancer";
import { MDXRemote } from "next-mdx-remote";

import { getPost, getPostSlugs } from "../../lib/content";
import { MDXRemoteSerializeResult } from "next-mdx-remote";

export async function getStaticPaths() {
	const paths = getPostSlugs();
	return {
		paths,
		fallback: false, // 404 paths that don't match a post
	};
}

export const getStaticProps: GetStaticProps = async (context) => {
	if (context.params && context.params.post) {
		const path = await getPost(context.params.post as string);

		return {
			props: {
				path,
			},
		};
	}

	return {
		props: { error: true },
	};
};

class Project extends React.Component<{
	path: { meta: { title: string }; mdx: MDXRemoteSerializeResult };
}> {
	render() {
		return (
			<article>
				<h1>
					<Balancer>{this.props.path.meta.title}</Balancer>
				</h1>
				<hr />
				<MDXRemote {...this.props.path.mdx} />
			</article>
		);
	}
}
export default Project;
