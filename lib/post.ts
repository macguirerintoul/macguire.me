import fs from "fs";
import path from "path";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import imageSize from "rehype-img-size";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { basename } from "node:path/win32";

const postsDirectory = path.join(process.cwd(), "posts");

export interface Frontmatter {
	title: string;
	created: string;
	updated: string;
}

export type BlogSource = MDXRemoteSerializeResult<
	Record<string, unknown>,
	Frontmatter
>;

interface PostData {
	url: string;
	mdxSource: BlogSource;
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

			const mdxSource: BlogSource = await serialize(fileContents, {
				parseFrontmatter: true,
			});

			return {
				url: slug,
				mdxSource: mdxSource,
			};
		})
	);

	const sortedPosts = allPostData.sort((a: PostData, b: PostData) => {
		const aDate = new Date(a.mdxSource.frontmatter.created);
		const bDate = new Date(b.mdxSource.frontmatter.created);
		return bDate.valueOf() - aDate.valueOf();
	});

	return JSON.parse(JSON.stringify(sortedPosts));
}

export async function getPost(id: string) {
	const fullPath: string = path.join(postsDirectory, `${id}.mdx`);
	const fileContents: string = fs.readFileSync(fullPath, "utf8");

	const mdx: MDXRemoteSerializeResult = await serialize(fileContents, {
		parseFrontmatter: true,
		mdxOptions: {
			rehypePlugins: [
				rehypeSlug,
				rehypeHighlight,
				// TODO fix
				// @ts-expect-error see https://github.com/hashicorp/next-mdx-remote/issues/86
				[imageSize, { dir: "public" }],
			],
		},
	});

	return JSON.parse(JSON.stringify(mdx));
}
