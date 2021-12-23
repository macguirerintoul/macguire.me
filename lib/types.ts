import { MDXRemoteSerializeResult } from "next-mdx-remote";

export type ProjectType = {
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
};

export type ResumeType = {
	experience: {
		organization: string;
		job: string;
		url: string;
		start: {
			year: number;
			month: number;
		};
		end?: {
			year: number;
			month: number;
		};
	};
	recognition: { title: string; context: string }[];
	tools: string[];
	skills: string[];
	interests: string[];
};
