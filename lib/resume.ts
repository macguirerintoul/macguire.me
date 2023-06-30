import fs from "fs";
import yaml from "js-yaml";
import { Resume } from "types";

export function getResumeData() {
	const file: string = fs.readFileSync("public/resume.yaml", "utf8");
	const data: Resume = yaml.load(file) as Resume;
	return data;
}
