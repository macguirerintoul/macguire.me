import { Star, StarsResponse } from "@/types/star";

// todo type
export async function getLatestCommit() {
	try {
		const latestCommit = await fetch(
			"https://api.github.com/repos/macguirerintoul/macguire.me/commits",
			{
				headers: {
					authorization: "token " + process.env.GITHUB_PAT,
				},
			},
		)
			.then((response) => response.json())
			.then((data) => {
				return data[0];
			});

		return {
			url: latestCommit.html_url as string,
			timestamp: new Date(Date.parse(latestCommit.commit.committer.date)),
			sha: latestCommit.sha,
			message: latestCommit.commit.message,
		};
	} catch (error) {
		console.error(error);
		return "Failed to get latest commit";
	}
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
