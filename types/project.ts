import { ParsedUrlQuery } from "querystring";

export interface ProjectFrontmatter {
	title: string;
	description: string;
	order: number;
	url: string;
}

export interface ProjectParams extends ParsedUrlQuery {
	project: string;
}
