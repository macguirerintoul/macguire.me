import React from "react";
import { PostContent } from "components/PostContent";
import Balancer from "react-wrap-balancer";
import { getPost, getPostSlugs } from "lib/post";
import { toDateString } from "lib/utilities";
import { Metadata } from "next";
import { getMDXExport } from "mdx-bundler/client";
import { TOC } from "components";

export async function generateMetadata({
	params,
}: {
	params: { slug: string };
}): Promise<Metadata> {
	const slug = params.slug;
	const post = await getPost(slug);

	return {
		title: post.frontmatter.title,
		openGraph: {
			title: post.frontmatter.title,
			url: "https://macguire.me",
			siteName: "Macguire Rintoul",
			images: [
				{
					url: "/api/ogimage?title=" + post.frontmatter.title,
				},
			],
			locale: "en_CA",
			type: "website",
		},
	};
}

export async function generateStaticParams() {
	const paths = await getPostSlugs();
	return paths;
}

const Post = async ({ params }: { params: { slug: string } }) => {
	const mdx = await getPost(params.slug as string);
	const headings = getMDXExport(mdx.code).tableOfContents;

	return (
		<div className="blog-post">
			<article>
				<h1>
					<Balancer>{mdx.frontmatter.title}</Balancer>
				</h1>
				<div className="post-metadata">
					{toDateString(new Date(mdx.frontmatter.created))}
				</div>
				<hr />
				<PostContent code={mdx.code} />
			</article>
			{headings.length > 0 && <TOC headings={headings} />}
		</div>
	);
};

export default Post;
