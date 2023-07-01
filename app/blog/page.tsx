import { getAllPosts } from "lib/post";
import { titleTemplate } from "lib/utilities";
import Link from "next/link";
import { Metadata } from "next";

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
						<li
							className="my-4 flex justify-between motion-safe:animate-floatUpFast"
							key={post.mdx.frontmatter.title}
							style={{ "--animation-order": index } as React.CSSProperties}
						>
							<Link href={post.url}>{post.mdx.frontmatter.title + " →"}</Link>
							<span className="text-gray-500">
								{new Intl.DateTimeFormat("en", {
									month: "long",
								}).format(post.mdx.frontmatter.created)}
							</span>
						</li>
					))}
				</ul>
			</section>
		</>
	);
}
