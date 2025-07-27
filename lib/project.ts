import fs from "fs/promises";
import path from "path";
import { bundleMDX } from "mdx-bundler";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import imageSize from "rehype-img-size";
import withToc from "@stefanprobst/rehype-extract-toc";
import withTocExport from "@stefanprobst/rehype-extract-toc/mdx";
import imageMetadata from "./image-metadata";

export interface Frontmatter {
	title: string;
	description: string;
}

const projectsDirectory = path.join(process.cwd(), "projects");

export async function getProjectSlugs() {
	const fileNames = await fs.readdir(projectsDirectory);
	return fileNames.map((fileName) => {
		return {
			slug: fileName.replace(/\.mdx$/, ""),
		};
	});
}

export async function getProject(slug: string) {
	const fullPath: string = path.join(projectsDirectory, `${slug}.mdx`);
	const mdxSource: string = await fs.readFile(fullPath, "utf8");

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
					// eslint-disable-next-line
					[imageSize, { dir: path.join(process.cwd(), "public") }] as any,
					imageMetadata,
				];
				return options;
			},
		});
	return { code, frontmatter };
}
export async function getAllProjects() {
	// Read all file names in the directory asynchronously
	const fileNames = await fs.readdir(projectsDirectory);

	const allProjectData = await Promise.all(
		fileNames.map(async (fileName) => {
			const slug = "/project/" + fileName.replace(/\.mdx$/, "");

			const fullPath = path.join(projectsDirectory, fileName);
			const fileContents = await fs.readFile(fullPath, "utf8");

			const { frontmatter } = await bundleMDX<Frontmatter>({
				source: fileContents,
			});

			return {
				href: slug,
				title: frontmatter.title,
				frontmatter,
			};
		}),
	);

	return allProjectData;
}
export async function getVisierWorkIds() {
	const fileNames = await fs.readdir(projectsDirectory + "/visier");
	return fileNames.map((fileName) => {
		return {
			params: {
				visierProject: fileName.replace(/\.mdx$/, ""),
			},
		};
	});
}
