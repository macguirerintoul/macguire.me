"use client";
import Balancer from "react-wrap-balancer";
import { toDateString } from "lib/utilities";
import { TOC, PostContent } from "components";
import { Frontmatter } from "lib/post";
import { Toc } from "@stefanprobst/rehype-extract-toc";

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
	<div className="blog-post">
		<article>
			<h1>
				<Balancer>{mdx.frontmatter.title}</Balancer>
			</h1>
			<div className="my-1 text-gray-500">
				{toDateString(new Date(mdx.frontmatter.created))}
			</div>
			<hr />
			<PostContent code={mdx.code} />
		</article>
		{headings.length > 0 && <TOC headings={headings} />}
	</div>
);
