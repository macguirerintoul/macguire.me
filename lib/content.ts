import fs, { Dirent } from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { ProjectSummaryInterface } from "./types";
import rehypeHighlight from "rehype-highlight";
import imageSize from "rehype-img-size";

const projectsDirectory = path.join(process.cwd(), "content/projects");
const processDirectory = path.join(process.cwd(), "content/process");
const postsDirectory = path.join(process.cwd(), "content/posts");

export function getAllPosts() {
	const fileNames = fs.readdirSync(postsDirectory);
	const allPostData = fileNames.map((fileName) => {
		// Remove `.mdx` from file name = slug
		const slug: string = "/blog/" + fileName.replace(/\.mdx$/, "");

		// Read markdown file as string
		const fullPath: string = path.join(postsDirectory, fileName);
		const fileContents: string = fs.readFileSync(fullPath, "utf8");

		// Use gray-matter to parse the post metadata section
		const matterResult: matter.GrayMatterFile<string> = matter(fileContents);

		return {
			url: slug,
			title: matterResult.data.title,
		};
	});

	return allPostData;
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

export function getAllProjectSummaries(): ProjectSummaryInterface[] {
	// Get file names under /work
	const directoryItems: Dirent[] = fs.readdirSync(projectsDirectory, {
		withFileTypes: true,
	});

	const fileNames: string[] = directoryItems
		.filter((directoryItem) => directoryItem.isFile())
		.map((directoryItem) => directoryItem.name);

	const allWorkData = fileNames.map((fileName) => {
		// Remove ".mdx" from file name to get slug
		const slug: string = "/" + fileName.replace(/\.mdx$/, "");

		// Read markdown file as string
		const fullPath: string = path.join(projectsDirectory, fileName);
		const fileContents: string = fs.readFileSync(fullPath, "utf8");

		// Use gray-matter to parse the post metadata section
		const matterResult: matter.GrayMatterFile<string> = matter(fileContents);

		return {
			url: slug,
			description: matterResult.data.description,
			title: matterResult.data.title,
			order: matterResult.data.order,
		};
	});

	return allWorkData.sort((a, b) => a.order - b.order);
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

export async function getProjectData(id: string) {
	const fullPath: string = path.join(projectsDirectory, `${id}.mdx`);
	const fileContents: string = fs.readFileSync(fullPath, "utf8");

	const processPath: string = path.join(processDirectory, `${id}-process.mdx`);
	const processFile: string = fs.readFileSync(processPath, "utf8");

	// Use gray-matter to parse the YAML front matter
	const { content, data } = matter(fileContents);
	const process: string = matter(processFile).content;

	const mdxProject: MDXRemoteSerializeResult = await serialize(content);
	const mdxProcess: MDXRemoteSerializeResult = await serialize(process);

	// Combine the data with the id
	return {
		id,
		meta: data,
		mdxProject,
		mdxProcess,
	};
}

export async function getPost(id: string) {
	const fullPath: string = path.join(postsDirectory, `${id}.mdx`);
	const fileContents: string = fs.readFileSync(fullPath, "utf8");

	// Use gray-matter to parse the YAML front matter
	const { content, data } = matter(fileContents);

	const mdx: MDXRemoteSerializeResult = await serialize(content, {
		mdxOptions: {
			rehypePlugins: [rehypeHighlight, [imageSize, { dir: "public" }]],
		},
	});

	// Combine the data with the id
	return {
		id,
		meta: data,
		mdx,
	};
}
