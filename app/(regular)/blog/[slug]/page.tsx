import React from "react";
import { BlogPost } from "components/BlogPost";
import { getPost, getPostSlugs } from "lib/post";
import { getMDXExport } from "mdx-bundler/client";

export async function generateMetadata(props: {
	params: Promise<{ slug: string }>;
}) {
	const params = await props.params;
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
					url: "/api/opengraph.png?title=" + post.frontmatter.title,
				},
			],
			locale: "en_CA",
			type: "website",
		},
	};
}

export async function generateStaticParams() {
	return getPostSlugs();
}

const Post = async (props: { params: Promise<{ slug: string }> }) => {
	const params = await props.params;
	const mdx = await getPost(params.slug as string);
	const headings = getMDXExport(mdx.code).tableOfContents;

	return <BlogPost mdx={mdx} headings={headings} />;
};

export default Post;
