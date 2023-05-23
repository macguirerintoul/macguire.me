import { GetStaticProps } from "next";
import React, { ReactNode } from "react";
import Balancer from "react-wrap-balancer";
import { MDXRemote } from "next-mdx-remote";
import Image, { ImageProps } from "next/image";
import Head from "next/head";
import { getPost, getPostSlugs, BlogSource } from "../../lib/post";

type NewImageProps = Omit<
	ImageProps,
	"src" | "alt" | "width" | "height" | "placeholder"
> & {
	src?: ImageProps["src"] | undefined;
	alt?: ImageProps["alt"] | undefined;
	width?: ImageProps["width"] | string | undefined;
	height?: ImageProps["height"] | string | undefined;
	placeholder?: ImageProps["placeholder"] | string | undefined;
};

const components = {
	h2: (props: { children?: ReactNode }) => (
		<h2>
			<Balancer>{props.children}</Balancer>
		</h2>
	),
	h3: (props: { children?: ReactNode }) => (
		<h3>
			<Balancer>{props.children}</Balancer>
		</h3>
	),
	img: (props: NewImageProps) => {
		const newAlt: string =
			typeof props.alt === "string" ? props.alt : "no alt provided";
		const newSrc: string = typeof props.src === "string" ? props.src : "nosrc";

		return (
			<Image
				alt={newAlt}
				width={Number(props.width)}
				height={Number(props.height)}
				src={newSrc}
				loading="lazy"
			/>
		);
	},
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
		const mdxSource = await getPost(context.params.post as string);

		return {
			props: {
				mdxSource,
			},
		};
	}

	return {
		props: { error: true },
	};
};

const Post = (props: { mdxSource: BlogSource }) => (
	<>
		<Head>
			<title>{props.mdxSource.frontmatter.title}</title>
			<meta
				property="og:image"
				content={"/api/ogimage?title=" + props.mdxSource.frontmatter.title}
			/>
		</Head>
		<article>
			<h1>
				<Balancer>{props.mdxSource.frontmatter.title}</Balancer>
			</h1>
			<span>
				{new Date(
					Date.parse(props.mdxSource.frontmatter.created)
				).toDateString()}
			</span>
			<hr />
			<MDXRemote {...props.mdxSource} components={components} />
		</article>
	</>
);

export default Post;
