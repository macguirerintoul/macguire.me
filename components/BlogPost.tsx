"use client";
import Balancer from "react-wrap-balancer";
import { toDateString } from "lib/utilities";
import { TOC } from "components/TOC";
import { Frontmatter } from "lib/post";
import { Toc } from "@stefanprobst/rehype-extract-toc";
import { PostContent } from "components/PostContent";
import { Calendar } from "react-feather";
export const BlogPost = ({
	mdx,
	headings,
}: {
	mdx: {
		code: string;
		frontmatter: Frontmatter;
	};
	headings: Toc;
}) => (
	<div className="mx-auto flex w-5xl gap-16">
		<article className="mx-auto w-full max-w-2xl">
			<h1>
				<Balancer>{mdx.frontmatter.title}</Balancer>
			</h1>
			<p className="my-2 flex items-center gap-1 text-lg text-neutral-500">
				<Calendar size={16} />
				{toDateString(new Date(mdx.frontmatter.created))}
			</p>
			<hr />
			<PostContent code={mdx.code} />
		</article>
		{headings.length > 0 && <TOC headings={headings} />}
	</div>
);
