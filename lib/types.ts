import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { ParsedUrlQuery } from "querystring";

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
	job: string;
	url?: string;
	start: {
		year: number;
		month: number;
	};
	end?: {
		year?: number;
		month?: number;
	};
	history?: string[];
	description: string[];
}

export type ResumeType = {
	experience: Array<IResumeExperience>;
	recognition: { title: string; context: string }[];
	tools: string[];
	skills: string[];
	interests: string[];
	education: { title: string; context: string; description: string }[];
};

export interface ProjectSummaryInterface {
	url: string;
	description: string;
	title: string;
	order: number;
}

export interface IProjectParams extends ParsedUrlQuery {
	project: string;
}

export interface ICommit {
	url: string;
	timestamp: string;
}
