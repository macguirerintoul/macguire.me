import React from "react";
import { getProject, getProjectSlugs } from "lib/project";
import { PostContent } from "components/PostContent";

export async function generateMetadata(props: {
	params: Promise<{ slug: string }>;
}) {
	const params = await props.params;
	const slug = params.slug;
	const project = await getProject(slug);

	return {
		title: project.frontmatter.title,
	};
}

export async function generateStaticParams() {
	return getProjectSlugs();
}

type Params = Promise<{ slug: string }>;

export default async function Project(props: { params: Params }) {
	const params = await props.params;
	const mdx = await getProject(params.slug as string);

	return (
		<section>
			<PostContent code={mdx.code} />
		</section>
	);
}
