import { titleTemplate } from "lib/utilities";
import { Metadata } from "next";
import { FancyListLink } from "components/FancyListLink";
import { Client, isFullPageOrDatabase } from "@notionhq/client";
import { getBaseDomain } from "lib/utilities";
import twas from "twas";
export const revalidate = 86400;

interface Link {
	href: string;
	name: string;
	created: string;
}

export const metadata: Metadata = {
	title: "Links " + titleTemplate,
};

const notion = new Client({
	auth: process.env.NOTION_TOKEN,
});

const Links = async () => {
	const linkResponse = await notion.databases.query({
		database_id: process.env.NOTION_LINKS_DB!,
		sorts: [
			{
				timestamp: "created_time",
				direction: "descending",
			},
		],
	});

	const links: Link[] = linkResponse.results
		.map((link) => {
			if (
				isFullPageOrDatabase(link) &&
				"url" in link.properties.URL &&
				typeof link.properties.URL.url == "string" &&
				"title" in link.properties.Name &&
				Array.isArray(link.properties.Name.title)
			) {
				return {
					href: link.properties.URL.url,
					name: link.properties.Name.title[0].plain_text,
					created: link.created_time,
				};
			}
		})
		.filter((item) => item !== undefined);

	return (
		<>
			<section>
				<h1>Links</h1>
				<hr />
				<ul className="list-none pl-0">
					{links.map((link, index) => {
						return (
							<FancyListLink
								key={index}
								href={link.href}
								title={link.name}
								style={{ "--animation-order": index } as React.CSSProperties}
								subtitle={getBaseDomain(link.href)}
								rightSide={twas(new Date(link.created).valueOf())}
							/>
						);
					})}
				</ul>
			</section>
		</>
	);
};

export default Links;
