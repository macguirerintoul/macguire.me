import { GetStaticProps } from "next";
import React from "react";
import Balancer from "react-wrap-balancer";
import { MDXRemote } from "next-mdx-remote";
import Head from "next/head";
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
				baseurl: process.env.BASE_URL,
			},
		};
	}

	return {
		props: { error: true },
	};
};

interface Props {
	path: {
		meta: {
			title: string;
		};
		mdx: MDXRemoteSerializeResult;
	};
	baseurl: string;
}

const Post = (props: Props) => (
	<>
		<Head>
			<title>{props.path.meta.title}</title>
			<meta
				property="og:image"
				content={props.baseurl + "/api/ogimage?title=" + props.path.meta.title}
			/>
		</Head>
		<article>
			<h1>
				<Balancer>{props.path.meta.title}</Balancer>
			</h1>
			<hr />
			<MDXRemote {...props.path.mdx} />
		</article>
	</>
);

export default Post;
