import Head from "next/head";
import { getAllPosts } from "../lib/content";
import { motion } from "framer-motion";
import { GetStaticProps } from "next";
import Link from "next/link";
export const getStaticProps: GetStaticProps = async () => {
	const posts = getAllPosts();

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
			<motion.section
				className="listblock-list"
				initial="hidden"
				animate="visible"
			>
				{props.posts.map((item: { title: string; url: string }) => (
					<Link key={item.title} title={item.title} href={item.url} />
				))}
			</motion.section>
		</>
	);
}