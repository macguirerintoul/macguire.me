import fs from "fs";
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

export function getProjectSlugs() {
	const fileNames = fs.readdirSync(projectsDirectory);
	return fileNames.map((fileName) => {
		return {
			slug: fileName.replace(/\.mdx$/, ""),
		};
	});
}

export async function getProject(slug: string) {
	const fullPath: string = path.join(projectsDirectory, `${slug}.mdx`);
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
	// Get a list of all the files in the posts directory
	const fileNames = fs.readdirSync(projectsDirectory);

	const allProjectData = await Promise.all(
		fileNames.map(async (fileName) => {
			// Remove `.mdx` from file name = slug
			const slug: string = "/project/" + fileName.replace(/\.mdx$/, "");

			// Read markdown file as string
			const fullPath: string = path.join(projectsDirectory, fileName);
			const fileContents: string = fs.readFileSync(fullPath, "utf8");

			// Compile the MDX
			const { frontmatter } = await bundleMDX<Frontmatter>({
				source: fileContents,
			});

			return {
				href: slug,
				title: frontmatter.title,
				frontmatter: frontmatter,
			};
		})
	);

	return allProjectData;
}

export function getVisierWorkIds() {
	const fileNames = fs.readdirSync(projectsDirectory + "/visier");
	return fileNames.map((fileName) => {
		return {
			params: {
				visierProject: fileName.replace(/\.mdx$/, ""),
			},
		};
	});
}
