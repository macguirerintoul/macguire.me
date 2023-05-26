import fs from "fs";
import path from "path";
import { bundleMDX } from "mdx-bundler";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import imageSize from "rehype-img-size";
import withToc from "@stefanprobst/rehype-extract-toc";
import withTocExport from "@stefanprobst/rehype-extract-toc/mdx";
import { ReactNode } from "react";
import { CompileMDXResult, compileMDX } from "next-mdx-remote/rsc";
import Balancer from "react-wrap-balancer";
import Image from "next/image";
import { ImageProps } from "next/image";

const postsDirectory = path.join(process.cwd(), "posts");

export interface Frontmatter {
	title: string;
	created: string;
	updated: string;
}

export type BlogSource = CompileMDXResult<Frontmatter>;

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
	h2: (props: { id?: string; children?: ReactNode }) => (
		<h2 id={props.id}>
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

interface PostData {
	url: string;
	mdx: BlogSource;
}

export function getPostSlugs() {
	const fileNames = fs.readdirSync(postsDirectory);
	return fileNames.map((fileName) => {
		return {
			params: {
				post: fileName.replace(/\.mdx$/, ""),
			},
		};
	});
}

export async function getAllPosts() {
	const fileNames = fs.readdirSync(postsDirectory);
	const allPostData = await Promise.all(
		fileNames.map(async (fileName) => {
			// Remove `.mdx` from file name = slug
			const slug: string = "/blog/" + fileName.replace(/\.mdx$/, "");

			// Read markdown file as string
			const fullPath: string = path.join(postsDirectory, fileName);
			const fileContents: string = fs.readFileSync(fullPath, "utf8");

			const mdx: BlogSource = await compileMDX<Frontmatter>({
				source: fileContents,
				options: { parseFrontmatter: true },
			});

			return {
				url: slug,
				mdx: mdx,
			};
		})
	);

	const sortedPosts = allPostData.sort((a: PostData, b: PostData) => {
		const aDate = new Date(a.mdx.frontmatter.created);
		const bDate = new Date(b.mdx.frontmatter.created);
		return bDate.valueOf() - aDate.valueOf();
	});

	return JSON.parse(JSON.stringify(sortedPosts));
}

export async function getPost(slug: string) {
	const fullPath: string = path.join(postsDirectory, `${slug}.mdx`);
	const mdxSource: string = fs.readFileSync(fullPath, "utf8");

	const result = await bundleMDX({
		source: mdxSource,
		mdxOptions(options) {
			options.rehypePlugins = [
				...(options.rehypePlugins ?? []),
				rehypeSlug,
				rehypeHighlight,
				withToc,
				withTocExport,
				[imageSize, { dir: "public" }] as any,
			];
			return options;
		},
	});

	return result;
}
