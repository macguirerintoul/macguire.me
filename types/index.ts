export * from "./project";
export * from "./resume";
export * from "./music";
export * from "./star";

export interface Commit {
	url: string;
	timestamp: Date;
	sha: string;
	message: string;
}
