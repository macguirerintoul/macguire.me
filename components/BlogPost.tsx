"use client";
import Balancer from "react-wrap-balancer";
import { toDateString } from "lib/utilities";
import { TOC } from "components/TOC"; 
import { Frontmatter } from "lib/post";
import { Toc } from "@stefanprobst/rehype-extract-toc";
import  {PostContent } from "components/PostContent"

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
	<div className="blog-post mx-auto flex max-w-(--max-container-width) gap-16  ">
		<article className="w-full">
			<h1>
				<Balancer>{mdx.frontmatter.title}</Balancer>
			</h1>
			<p className="my-2 font-mono text-xl text-neutral-500">
				{toDateString(new Date(mdx.frontmatter.created))}
			</p>
			<hr />
			<PostContent code={mdx.code} />
		</article>
		{headings.length > 0 && <TOC headings={headings} />}
	</div>
);
