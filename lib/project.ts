import fs from "fs";
import path from "path";

const projectsDirectory = path.join(process.cwd(), "content/projects");

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
