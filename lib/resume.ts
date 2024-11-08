import fs from "fs";
import yaml from "js-yaml";
import { ResumeType, ResumeExperience } from "types";

export function getResumeData() {
	const file: string = fs.readFileSync("public/resume.yaml", "utf8");
	const data: ResumeType = yaml.load(file) as ResumeType;
	return data;
}

// Human-readable date ranges
// e.g. 2021-01-01, 2022-02-02 => January 2021–February 2022
export function getCalendarString(
	start: ResumeExperience["start"],
	end: ResumeExperience["end"]
) {
	const startDate = new Date(start.year, start.month - 1);
	const startString = startDate.toLocaleString(undefined, {
		month: "long",
		year: "numeric",
	});
	let endDate: Date = new Date();
	if (typeof end !== "undefined" && end["year"] && end["month"]) {
		endDate = new Date(end.year, end.month - 1);
	}
	const endString: string =
		typeof end === "undefined"
			? "present"
			: endDate.toLocaleString(undefined, { month: "long", year: "numeric" });
	return `${startString}–${endString}`;
}

// Get the relative length of time between two dates
// e.g. 2021-01-01, 2022-02-02 => 1 year 2 months
export function lengthOfService(
	start: ResumeExperience["start"],
	end: ResumeExperience["end"]
): string {
	const startDate = new Date(start.year, start.month - 1);
	let endDate: Date = new Date();
	if (typeof end !== "undefined" && end["year"] && end["month"]) {
		endDate = new Date(end.year, end.month - 1);
	}
	const lenghInMonths: number =
		endDate.getMonth() -
		startDate.getMonth() +
		12 * (endDate.getFullYear() - startDate.getFullYear()) +
		1;
	const years: number = Math.floor(lenghInMonths / 12);
	const months: number = lenghInMonths % 12;
	const yearString = `${years} ${years > 1 ? "years" : "year"}`;
	const monthString =
		months > 1 ? `${months} ${months > 1 ? "months" : "month"}` : "";
	if (years === 0) {
		return `${monthString}`;
	} else {
		return `${yearString} ${monthString}`;
	}
}
