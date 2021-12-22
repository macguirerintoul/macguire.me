import fs, { Dirent } from "fs";
import path from "path";
import matter from "gray-matter";

const workDirectory = path.join(process.cwd(), "content/projects");
const processDirectory = path.join(process.cwd(), "content/process");

export function getAllProjects(): Array<Object> {
	// Get items in the `projects` directory
	const directoryItems: Dirent[] = fs.readdirSync(workDirectory, { withFileTypes: true });
	// Filter those items to files only
	const fileNames: string[] = directoryItems.filter(directoryItem => directoryItem.isFile()).map(directoryItem => directoryItem.name);

	// Create the array of all work objects
	const allWorkData = fileNames.map((fileName: string) => {
		// Remove ".mdx" from file name to get id
		const slug: string = fileName.replace(/\.mdx$/, "");

		// Read markdown file as string
		const fullPath: string = path.join(workDirectory, fileName);
		const fileContents: string = fs.readFileSync(fullPath, "utf8");

		// Use gray-matter to parse the post metadata section
		const matterResult: matter.GrayMatterFile<string> = matter(fileContents);

		// Combine the data with the id
		return {
			path: slug,
			order: matterResult.data.order,
			description: matterResult.data.description
		};
	});

	return allWorkData.sort((a, b) => a.order - b.order);
}

export function getAllWorkIds() {
	const fileNames: string[] = fs.readdirSync(workDirectory);
	return fileNames.map((fileName) => {
		return {
			params: {
				project: fileName.replace(/\.mdx$/, ""),
			},
		};
	});
}

export function getVisierWorkIds() {
	const fileNames = fs.readdirSync(workDirectory + "/visier");
	return fileNames.map((fileName) => {
		return {
			params: {
				visierProject: fileName.replace(/\.mdx$/, ""),
			},
		};
	});
}

export async function getProjectData(id: string) {
	const fullPath: string = path.join(workDirectory, `${id}.mdx`);
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
