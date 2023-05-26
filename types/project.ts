import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { ParsedUrlQuery } from "querystring";

export interface Project {
	id: string;
	meta: {
		title: string;
		for: string;
		description: string;
		imagePath: string;
		year: number;
		order: number;
		url: string;
		tags: string[];
		roles: string[];
		tools: string[];
		summary: string;
		parentProject?: boolean;
	};
	mdxProject: MDXRemoteSerializeResult;
	mdxProcess: MDXRemoteSerializeResult;
}

export interface ProjectFrontmatter {
	title: string;
	description: string;
	order: number;
	url: string;
}

export type ProjectSource = MDXRemoteSerializeResult<
	Record<string, unknown>,
	ProjectFrontmatter
>;

export interface ProjectParams extends ParsedUrlQuery {
	project: string;
}
