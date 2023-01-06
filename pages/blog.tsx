
import { getAllPosts } from "../lib/content";
import MagicLink from "../components/magiclink";

export const getStaticProps: GetStaticProps = async () => {
	const posts = getAllPosts();

	return {
		props: {
			posts,
		},
	};
};
export default function Blog(props: {
	posts
}) {
	return (
		<div>
			<h1>Blog</h1>
			{props.posts.map((item) => (
				<div><MagicLink url={ item.url }>{item.title}</MagicLink></div>
			))}
		</div>
	);
}