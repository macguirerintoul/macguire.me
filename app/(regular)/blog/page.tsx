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
							className="my-4 flex flex-col justify-between motion-safe:animate-floatUpFast sm:flex-row"
							key={post.frontmatter.title}
							style={{ "--animation-order": index } as React.CSSProperties}
						>
							<Link
								href={post.url}
								className="transition-left relative left-0 duration-100 ease-in-out motion-safe:hover:left-1"
							>
								{post.frontmatter.title}
							</Link>

							<span className="text-neutral-500">
								{new Intl.DateTimeFormat("en-CA", {
									month: "long",
									day: "numeric",
									year: "numeric",
								}).format(post.frontmatter.created)}
							</span>
						</li>
					))}
				</ul>
			</section>
		</>
	);
}
