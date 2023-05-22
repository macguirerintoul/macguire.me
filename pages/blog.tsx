import Head from "next/head";
import { BlogSource, getAllPosts } from "../lib/post";
import { motion } from "framer-motion";
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
			<h1>Blog</h1>
			<hr />
			<motion.section className="listblock-list">
				{props.posts.map((item: { url: string; mdxSource: BlogSource }) => (
					<li key={item.mdxSource.frontmatter.title}>
						<Link href={item.url}>{item.mdxSource.frontmatter.title}</Link>
					</li>
				))}
			</motion.section>
		</>
	);
}
