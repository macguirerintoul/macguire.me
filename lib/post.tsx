import fs from "fs";
import path from "path";
import { bundleMDX } from "mdx-bundler";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import imageSize from "rehype-img-size";
import withToc from "@stefanprobst/rehype-extract-toc";
import withTocExport from "@stefanprobst/rehype-extract-toc/mdx";
import imageMetadata from "./image-metadata";
import { BundleMDX } from "mdx-bundler/dist/types";

const postsDirectory = path.join(process.cwd(), "posts");

export interface Frontmatter {
	title: string;
	created: Date;
	updated: Date;
}

export type BlogSource = BundleMDX<Frontmatter>;

interface PostData {
	url: string;
	frontmatter: Frontmatter;
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
	// Get a list of all the files in the posts directory
	const fileNames = fs.readdirSync(postsDirectory);

	const allPostData = await Promise.all(
		fileNames.map(async (fileName) => {
			// Remove `.mdx` from file name = slug
			const slug: string = "/blog/" + fileName.replace(/\.mdx$/, "");

			// Read markdown file as string
			const fullPath: string = path.join(postsDirectory, fileName);
			const fileContents: string = fs.readFileSync(fullPath, "utf8");

			// Compile the MDX
			const { code, frontmatter } = await bundleMDX<Frontmatter>({
				source: fileContents,
			});

			return {
				url: slug,
				frontmatter: frontmatter,
				year: frontmatter.created.getFullYear(),
			};
		})
	);

	const sortedPosts = allPostData.sort((a: PostData, b: PostData) => {
		const aDate = new Date(a.frontmatter.created);
		const bDate = new Date(b.frontmatter.created);
		return bDate.valueOf() - aDate.valueOf();
	});

	return sortedPosts;
}

export async function getPost(slug: string) {
	const fullPath: string = path.join(postsDirectory, `${slug}.mdx`);
	const mdxSource: string = fs.readFileSync(fullPath, "utf8");

	const { code, frontmatter }: { code: string; frontmatter: Frontmatter } =
		await bundleMDX({
			source: mdxSource,
			mdxOptions(options) {
				options.rehypePlugins = [
					...(options.rehypePlugins ?? []),
					rehypeSlug,
					rehypeHighlight,
					withToc,
					withTocExport,
					[imageSize, { dir: path.join(process.cwd(), "public") }] as any,
					imageMetadata,
				];
				return options;
			},
		});

	return { code, frontmatter };
}
