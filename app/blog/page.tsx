import { getAllPosts } from "lib/post";
import { titleTemplate } from "lib/utilities";
import Link from "next/link";
import { Metadata } from "next";
import { FancyListLink } from "components/FancyListLink";

export const metadata: Metadata = {
	title: "Blog " + titleTemplate,
};

export default async function Blog() {
	const posts = await getAllPosts();

	return (
		<>
			<section>
				<h1>Blog</h1>
				<hr />
				<ul className="list-none pl-0">
					{posts.map((post, index) => (
						<FancyListLink
							href={post.url}
							style={{ "--animation-order": index } as React.CSSProperties}
							key={post.frontmatter.title}
							title={post.frontmatter.title}
							rightSide={new Intl.DateTimeFormat("en-CA", {
								month: "long",
								day: "numeric",
								year: "numeric",
							}).format(post.frontmatter.created)}
						/>
					))}
				</ul>
			</section>
		</>
	);
}
