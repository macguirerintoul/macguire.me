import { Client, isFullPageOrDatabase } from "@notionhq/client";
import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";

const notion = new Client({
	auth: process.env.NOTION_TOKEN,
});

const databaseId = process.env.NOTION_LINKS_DB!;

export interface Link {
	href: string;
	name: string;
	created: string;
}

export interface LinksResponse {
	links: Link[];
	nextCursor: string | null;
}

async function queryLinksDatabase(
	cursor?: string,
	pageSize: number = 20,
): Promise<QueryDatabaseResponse> {
	return await notion.databases.query({
		database_id: databaseId,
		sorts: [
			{
				timestamp: "created_time",
				direction: "descending",
			},
		],
		start_cursor: cursor || undefined,
		page_size: pageSize,
	});
}

function parseLink(link: any): Link | null {
	if (
		isFullPageOrDatabase(link) &&
		"url" in link.properties.URL &&
		typeof link.properties.URL.url === "string" &&
		"title" in link.properties.Name &&
		Array.isArray(link.properties.Name.title) &&
		link.properties.Name.title.length > 0
	) {
		return {
			href: link.properties.URL.url,
			name: link.properties.Name.title[0].plain_text,
			created: link.created_time,
		};
	}
	return null;
}

export async function getLinks(
	cursor?: string,
	pageSize: number = 100,
): Promise<LinksResponse> {
	const response = await queryLinksDatabase(cursor, pageSize);

	const links: Link[] = response.results
		.map((link) => parseLink(link))
		.filter((item): item is Link => item !== null);

	return {
		links,
		nextCursor: response.has_more ? response.next_cursor : null,
	};
}
