"use client";
import Balancer from "react-wrap-balancer";
import { toDateString } from "lib/utilities";
import { TOC, PostContent } from "components";

export const BlogPost = ({ mdx, headings }) => {
	return (
		<div className="blog-post">
			<article>
				<h1>
					<Balancer>{mdx.frontmatter.title}</Balancer>
				</h1>
				<div className="post-metadata">
					{toDateString(new Date(mdx.frontmatter.created))}
				</div>
				<hr />
				<PostContent code={mdx.code} />
			</article>
			{headings.length > 0 && <TOC headings={headings} />}
		</div>
	);
};
