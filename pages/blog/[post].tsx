import { GetStaticProps } from "next";
import React, { ReactNode } from "react";
import Balancer from "react-wrap-balancer";
import { MDXRemote } from "next-mdx-remote";
import Image from "next/image";
import Head from "next/head";
import { getPost, getPostSlugs } from "../../lib/content";
import { MDXRemoteSerializeResult } from "next-mdx-remote";

const components = {
	h2: (props: { children: ReactNode }) => (
		<h2>
			<Balancer>{props.children}</Balancer>
		</h2>
	),
	h3: (props: { children: ReactNode }) => (
		<h3>
			<Balancer>{props.children}</Balancer>
		</h3>
	),
	img: (props) => <Image {...props} loading="lazy" />,
};

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
			<MDXRemote {...props.path.mdx} components={components} />
		</article>
	</>
);

export default Post;
