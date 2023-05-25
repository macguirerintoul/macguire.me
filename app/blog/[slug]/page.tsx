import React from "react";
import Balancer from "react-wrap-balancer";
import Head from "next/head";
import { getPost, getPostSlugs, BlogSource } from "lib/post";
import { baseurl, toDateString } from "lib/utilities";

export async function generateStaticParams() {
	const paths = await getPostSlugs();
	return paths;
}

const Post = async ({ params }: { params: { slug: string } }) => {
	const mdx = await getPost(params.slug as string);

	return (
		<>
			<Head>
				<title>{mdx.frontmatter.title}</title>
				<meta
					property="og:image"
					content={`${baseurl}/api/ogimage?title=${mdx.frontmatter.title}`}
				/>
			</Head>
			<article>
				<h1>
					<Balancer>{mdx.frontmatter.title}</Balancer>
				</h1>
				<div className="post-metadata">
					{toDateString(new Date(mdx.frontmatter.created))}
				</div>
				<hr />
				{mdx.content}
			</article>
		</>
	);
};

export default Post;
