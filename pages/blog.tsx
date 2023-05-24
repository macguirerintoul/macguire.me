import Head from "next/head";
import { BlogSource, getAllPosts } from "../lib/post";
import Balancer from "react-wrap-balancer";
import { GetStaticProps } from "next";
import Link from "next/link";

export const getStaticProps: GetStaticProps = async () => {
	const posts = await getAllPosts();
	return {
		props: {
			posts,
		},
	};
};

export default function Blog(props: { posts: [] }) {
	return (
		<>
			<Head>
				<title>Blog ✦ Macguire Rintoul</title>
			</Head>
			<section>
				<h1>Blog</h1>
				<hr />
				<ul className="link-list">
					{props.posts.map(
						(item: { url: string; mdxSource: BlogSource }, index) => (
							<li
								key={item.mdxSource.frontmatter.title}
								style={{ "--animation-order": index } as React.CSSProperties}
							>
								<Balancer>
									<Link href={item.url}>
										{item.mdxSource.frontmatter.title + " →"}
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
