import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { ParsedUrlQuery } from "querystring";

export interface Album {
	title: string;
	artist: string;
	url: string;
	image: string;
}

export interface IProject {
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

export interface IResumeExperience {
	organization: string;
	url?: string;
	start: {
		year: number;
		month: number;
	};
	end?: {
		year?: number;
		month?: number;
	};
	history?: {
		job: string;
		description?: string;
		start: {
			year: number;
			month: number;
		};
		end?: {
			year?: number;
			month?: number;
		};
	}[];
}

export type ResumeType = {
	experience: Array<IResumeExperience>;
	recognition: { title: string; context: string }[];
	tools: string[];
	skills: string[];
	interests: string[];
	education: { title: string; context: string; description: string }[];
};

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

export interface IProjectParams extends ParsedUrlQuery {
	project: string;
}

export interface ICommit {
	url: string;
	timestamp: string;
}
