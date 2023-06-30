import fs, { Dirent } from "fs";
import path from "path";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { ProjectSource } from "types";

const projectsDirectory = path.join(process.cwd(), "content/projects");
const processDirectory = path.join(process.cwd(), "content/process");

interface ProjectData {
	url: string;
	mdxSource: ProjectSource;
}

export async function getAllProjectSummaries() {
	// Get file names under /work
	const directoryItems: Dirent[] = fs.readdirSync(projectsDirectory, {
		withFileTypes: true,
	});

	const fileNames: string[] = directoryItems
		.filter((directoryItem) => directoryItem.isFile())
		.map((directoryItem) => directoryItem.name);

	const allWorkData = Promise.all(
		fileNames.map(async (fileName) => {
			// Remove ".mdx" from file name to get slug
			const slug: string = "/" + fileName.replace(/\.mdx$/, "");

			// Read markdown file as string
			const fullPath: string = path.join(projectsDirectory, fileName);
			const fileContents: string = fs.readFileSync(fullPath, "utf8");

			const mdxSource: MDXRemoteSerializeResult = await serialize(
				fileContents,
				{
					parseFrontmatter: true,
				}
			);

			return {
				url: slug,
				mdxSource: mdxSource,
			};
		})
	);

	return JSON.parse(JSON.stringify(allWorkData)).sort(
		(a: ProjectData, b: ProjectData) =>
			a.mdxSource.frontmatter.order - b.mdxSource.frontmatter.order
	);
}

export function getStaticProjects() {
	const fileNames: string[] = fs.readdirSync(projectsDirectory);
	return fileNames.map((fileName) => {
		return {
			params: {
				project: fileName.replace(/\.mdx$/, ""),
			},
		};
	});
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

export async function getProject(id: string) {
	const fullPath: string = path.join(projectsDirectory, `${id}.mdx`);
	const fileContents: string = fs.readFileSync(fullPath, "utf8");

	const processPath: string = path.join(processDirectory, `${id}-process.mdx`);
	const processFile: string = fs.readFileSync(processPath, "utf8");

	const mdxProject: MDXRemoteSerializeResult = await serialize(fileContents, {
		parseFrontmatter: true,
		mdxOptions: {
			// TODO fix
			// @ts-expect-error see https://github.com/hashicorp/next-mdx-remote/issues/86
			rehypePlugins: [rehypeHighlight, [imageSize, { dir: "public" }]],
		},
	});
	const mdxProcess: MDXRemoteSerializeResult = await serialize(processFile, {
		parseFrontmatter: true,
		mdxOptions: {
			// TODO fix
			// @ts-expect-error see https://github.com/hashicorp/next-mdx-remote/issues/86
			rehypePlugins: [rehypeHighlight, [imageSize, { dir: "public" }]],
		},
	});

	// Combine the data with the id
	return {
		id,
		mdxProject: mdxProject,
		mdxProcess: mdxProcess,
	};
}
