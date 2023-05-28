import { BlogSource, getAllPosts } from "lib/post";
import Balancer from "react-wrap-balancer";
import { titleTemplate } from "lib/utilities";
import Link from "next/link";
import { toDateString } from "lib/utilities";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Blog " + titleTemplate,
};

export default async function Blog() {
	const posts = await getAllPosts();
	const uniqueYears = [...new Set(posts.map((post) => post.year))];

	return (
		<>
			<section>
				<h1>Blog</h1>
				<hr />
				<ul className="blog-list util-unstyled-list">
					{posts.map((post, index) => (
						<li
							key={post.mdx.frontmatter.title}
							style={{ "--animation-order": index } as React.CSSProperties}
						>
							<Link href={post.url}>{post.mdx.frontmatter.title + " →"}</Link>
							<span>
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
