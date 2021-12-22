import fs, { Dirent } from "fs";
import path from "path";
import matter from "gray-matter";

const projectsDirectory = path.join(process.cwd(), "content/projects");
const processDirectory = path.join(process.cwd(), "content/process");

export function getAllProjects(): Array<Object> {
	// Get file names under /work
	const directoryItems: Dirent[] = fs.readdirSync(projectsDirectory, { withFileTypes: true });
	const fileNames: string[] = directoryItems
		.filter(directoryItem => directoryItem.isFile())
		.map(directoryItem => directoryItem.name);
	const allWorkData = fileNames.map((fileName) => {
		// Remove ".mdx" from file name to get id
		const slug: string = fileName.replace(/\.mdx$/, "");

		// Read markdown file as string
		const fullPath: string = path.join(projectsDirectory, fileName);
		const fileContents: string = fs.readFileSync(fullPath, "utf8");

		// Use gray-matter to parse the post metadata section
		const matterResult: matter.GrayMatterFile<string> = matter(fileContents);

		return { 
			url: slug,
			description: matterResult.data.description,
			title: matterResult.data.title,
			order: matterResult.data.order
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

	// Use gray-matter to parse the post metadata section
	const { content, data } = matter(fileContents);
	const process: string = matter(processFile).content;

	// Combine the data with the id
	return {
		id,
		data,
		content,
		process,
	};
}
