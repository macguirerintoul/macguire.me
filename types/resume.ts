export type ResumeExperience = {
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
	description: string;
	history: {
		job: string;
		start: {
			year: number;
			month: number;
		};
		end?: {
			year?: number;
			month?: number;
		};
	}[];
};

export type Resume = {
	experience: Array<ResumeExperience>;
	recognition: { title: string; context: string }[];
	tools: string[];
	skills: string[];
	interests: string[];
	education: { title: string; context: string; description: string }[];
};
