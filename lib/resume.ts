import fs from "fs";
import yaml from "js-yaml";

export function getResumeData() {
	const file: string = fs.readFileSync("public/resume.yaml", "utf8");
	return yaml.load(file);
}
