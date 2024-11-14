import { titleTemplate } from "lib/utilities";
import { Metadata } from "next";
import { MagicLink } from "components/MagicLink";
import { Client } from "@notionhq/client";
import { relativeTime, getBaseDomain } from "lib/utilities";

export const metadata: Metadata = {
	title: "Links " + titleTemplate,
};

const notion = new Client({
	auth: process.env.NOTION_TOKEN,
});

const Links = async () => {
	const linkResponse = await notion.databases.query({
		database_id: "3d18bf14c17b4112a56c14a79e6f66c2",
		sorts: [
			{
				timestamp: "created_time",
				direction: "descending",
			},
		],
	});
	const links = linkResponse.results;

	return (
		<>
			<section>
				<h1>Links</h1>
				<hr />
				<p>
					Links I've saved for one reason or another. Themes include personal
					sites, design inspiration, and other cool projects. Backed by a Notion
					database.
				</p>
				<ul className="list-none pl-0">
					{links.map((link) => (
						<MagicLink
							key={link.id}
							arrow={false}
							href={link.properties.URL.url}
							className="mb-2 flex justify-between gap-4 rounded-md border border-neutral-200 bg-neutral-50 p-4 text-black no-underline drop-shadow-sm"
						>
							<div className="shrink truncate">
								{link.properties.Name.title[0].plain_text}{" "}
								<span className=" text-neutral-400">
									{getBaseDomain(link.properties.URL.url)}
								</span>
							</div>
							<span className="flex-none text-right text-neutral-400">
								{relativeTime(new Date(link.properties.Created.created_time))}
							</span>
						</MagicLink>
					))}
				</ul>
			</section>
		</>
	);
};

export default Links;
