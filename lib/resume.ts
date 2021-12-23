import fs from "fs";
import yaml from "js-yaml";
import { ResumeType } from "./types";

export function getResumeData() {
	const file: string = fs.readFileSync("content/resume.yaml", "utf8");
	const data: ResumeType = yaml.load(file) as ResumeType;
	return data;
}
