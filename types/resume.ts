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

export type Resume = {
	experience: Array<IResumeExperience>;
	recognition: { title: string; context: string }[];
	tools: string[];
	skills: string[];
	interests: string[];
	education: { title: string; context: string; description: string }[];
};
