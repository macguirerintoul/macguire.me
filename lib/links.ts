import "server-only";
import { Client } from "@notionhq/client";

const notion = new Client({
	auth: process.env.NOTION_TOKEN,
});

const dataSourceId = process.env.NOTION_LINKS_DATA_SOURCE!;

export interface Link {
	href: string;
	name: string;
	created: string;
	tags?: string[];
}

export interface LinksResponse {
	links: Link[];
	nextCursor: string | null;
}

async function queryLinksDataSource(
	cursor?: string,
	pageSize: number = 100,
	tag?: string,
) {
	const filter = tag
		? {
				property: "Tags",
				multi_select: {
					contains: tag,
				},
			}
		: undefined;

	return await notion.dataSources.query({
		data_source_id: dataSourceId,
		sorts: [
			{
				timestamp: "created_time",
				direction: "descending",
			},
		],
		start_cursor: cursor || undefined,
		page_size: pageSize,
		filter,
	});
}

function parseLink(link: any): Link | null {
	if (
		"url" in link.properties.URL &&
		typeof link.properties.URL.url === "string" &&
		"title" in link.properties.Name &&
		Array.isArray(link.properties.Name.title) &&
		link.properties.Name.title.length > 0
	) {
		// Extract tags if they exist
		let tags: string[] = [];
		if (
			"multi_select" in link.properties.Tags &&
			Array.isArray(link.properties.Tags.multi_select)
		) {
			tags = link.properties.Tags.multi_select
				.map((tag: any) => tag.name)
				.filter(Boolean);
		}

		return {
			href: link.properties.URL.url,
			name: link.properties.Name.title[0].plain_text,
			created: link.created_time,
			tags: tags.length > 0 ? tags : undefined,
		};
	}
	return null;
}

export async function getLinks(
	cursor?: string,
	pageSize: number = 100,
	tag?: string,
): Promise<LinksResponse> {
	const response = await queryLinksDataSource(cursor, pageSize, tag);

	const links: Link[] = response.results
		.map((link) => parseLink(link))
		.filter((item): item is Link => item !== null);

	return {
		links,
		nextCursor: response.has_more ? response.next_cursor : null,
	};
}

export async function getAvailableTags(): Promise<string[]> {
	try {
		// Get database properties to extract available tags
		const dataSource = await notion.dataSources.retrieve({
			data_source_id: dataSourceId,
		});

		if (
			"multi_select" in dataSource.properties.Tags &&
			dataSource.properties.Tags.multi_select?.options
		) {
			return dataSource.properties.Tags.multi_select.options
				.map((option) => option.name)
				.sort();
		}

		return [];
	} catch (error) {
		console.error("Error fetching available tags:", error);
		return [];
	}
}
