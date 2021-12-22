import Layout from "../components/layout";
export default function Sink() {
	return (
		<Layout>
			<div className="sink">
				<h1>Heading 1</h1>
				<h2>Heading 2</h2>
				<h3>Heading 3</h3>
				<h4>Heading 4</h4>
				<h5>Heading 5</h5>
				<h6>Heading 6</h6>
				<p className="hero-paragraph">
					This is a hero paragraph. Lorem Ipsum is simply dummy text of the
					printing and typesetting industry. Lorem Ipsum has been the industry&apos;s
					standard dummy text ever since the 1500s, when an unknown printer took
					a galley of type and scrambled it to make a type specimen book.
				</p>
				<p>
					Lorem Ipsum is simply dummy text of the printing and typesetting
					industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever
					since the 1500s, when an unknown printer took a galley of type and
					scrambled it to make a type specimen book. It has survived not only
					five centuries, but also the leap into electronic typesetting,
					remaining essentially unchanged. It was popularised in the 1960s with
					the release of Letraset sheets containing Lorem Ipsum passages, and
					more recently with desktop publishing software like Aldus PageMaker
					including versions of Lorem Ipsum.
				</p>
				<span>This is a span</span>
				<a href="#">This is a link</a>
			</div>
		</Layout>
	);
}
