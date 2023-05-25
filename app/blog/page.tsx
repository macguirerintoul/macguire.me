import Head from "next/head";
import { BlogSource, getAllPosts } from "lib/post";
import Balancer from "react-wrap-balancer";
import { titleTemplate } from "lib/utilities";
import Link from "next/link";

export default async function Blog() {
	const posts = await getAllPosts();
	return (
		<>
			<Head>
				<title>{"Blog" + titleTemplate}</title>
			</Head>
			<section>
				<h1>Blog</h1>
				<hr />
				<ul className="link-list">
					{posts.map(
						(item: { url: string; mdx: BlogSource }, index: number) => (
							<li
								key={item.mdx.frontmatter.title}
								style={{ "--animation-order": index } as React.CSSProperties}
							>
								<Balancer>
									<Link href={item.url}>
										{item.mdx.frontmatter.title + " →"}
									</Link>
								</Balancer>
							</li>
						)
					)}
				</ul>
			</section>
		</>
	);
}
