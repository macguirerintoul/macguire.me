import { Star } from "@/types/star";

export interface StarsResponse {
	stars: Star[];
	nextCursor: string | null;
}

export async function getStars(
	cursor?: string,
	pageSize: number = 100,
): Promise<StarsResponse> {
	try {
		// Convert cursor to page number for GitHub API
		const page = cursor ? parseInt(cursor) : 1;

		const stars = await fetch(
			`https://api.github.com/users/macguirerintoul/starred?per_page=${pageSize}&page=${page}`,
			{
				headers: {
					authorization: "token " + process.env.GITHUB_PAT,
				},
				next: { revalidate: 86400 },
			},
		)
			.then((response) => response.json())
			.then((data) => {
				return data as Star[];
			});

		// Determine if there's a next page
		const hasMore = stars.length === pageSize;
		const nextCursor = hasMore ? (page + 1).toString() : null;

		return {
			stars,
			nextCursor,
		};
	} catch (error) {
		console.error(error);
		return {
			stars: [],
			nextCursor: null,
		};
	}
}
