export * from "./album";
export * from "./project";
export * from "./resume";

export interface Commit {
	url: string;
	timestamp: Date;
	sha: string;
}
