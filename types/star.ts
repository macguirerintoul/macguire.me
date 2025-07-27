export type Star = {
	id: number;
	name: string;
	full_name: string;
	html_url: string;
	description: string;
	stargazers_count: number;
	language: string;
};

export interface StarsResponse {
	stars: Star[];
	nextPage: number | null;
}
