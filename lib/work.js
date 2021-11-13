import fs from "fs";
import path from "path";
import matter from "gray-matter";

const workDirectory = path.join(process.cwd(), "work");
const processDirectory = path.join(process.cwd(), "process");

export function getWork() {
	// Get file names under /work
	const fileNames = fs.readdirSync(workDirectory);
	const allWorkData = fileNames.map((fileName) => {
		// Remove ".mdx" from file name to get id
		const slug = fileName.replace(/\.mdx$/, "");

		// Read markdown file as string
		const fullPath = path.join(workDirectory, fileName);
		const fileContents = fs.readFileSync(fullPath, "utf8");

		// Use gray-matter to parse the post metadata section
		const matterResult = matter(fileContents);

		// Combine the data with the id
		return {
			slug,
			path: slug,
			...matterResult.data,
		};
	});

	return allWorkData.sort((a, b) => a.order - b.order);
}

export function getAllWorkIds() {
	const fileNames = fs.readdirSync(workDirectory);
	return fileNames.map((fileName) => {
		return {
			params: {
				project: fileName.replace(/\.mdx$/, ""),
			},
		};
	});
}

export async function getProjectData(id) {
	const fullPath = path.join(workDirectory, `${id}.mdx`);
	const fileContents = fs.readFileSync(fullPath, "utf8");

	const processPath = path.join(processDirectory, `${id}-process.mdx`);
	const processFile = fs.readFileSync(processPath, "utf8");

	// Use gray-matter to parse the post metadata section
	const { content, data } = matter(fileContents);
	const process = matter(processFile).content;

	// Combine the data with the id
	return {
		id,
		data,
		content,
		process,
	};
}
