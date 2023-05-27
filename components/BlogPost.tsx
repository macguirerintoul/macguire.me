"use client";
import Balancer from "react-wrap-balancer";
import { toDateString } from "lib/utilities";
import { TOC, PostContent } from "components";
import { useEffect, useState, useRef } from "react";

export const BlogPost = ({ mdx, headings }) => {
	const headingElementsRef = useRef({});
	const [activeHeadings, setActiveHeadings] = useState();

	useEffect(() => {
		const callback = (entries) => {
			headingElementsRef.current = entries.reduce((map, headingElement) => {
				map[headingElement.target.id] = headingElement;
				return map;
			}, headingElementsRef.current);

			const visibleHeadings = [];
			Object.keys(headingElementsRef.current).forEach((key) => {
				const headingElement = headingElementsRef.current[key];
				if (headingElement.isIntersecting) {
					// console.log("hello " + headingElement.target.id + " :)");
					visibleHeadings.push(headingElement.target.id);
				}
			});
			setActiveHeadings(visibleHeadings);
		};

		// get the elements with the IDs of headings
		const headingElements = document.querySelectorAll("h2,h3");

		// create an intersection observer
		const observer = new IntersectionObserver(callback, {
			rootMargin: "0px 0px -10% 0px",
		});

		// attach the intersection observer to the heading elements
		headingElements.forEach((element) => {
			observer.observe(element);
		});

		return () => observer.disconnect();
	}, []);

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
			{headings.length > 0 && (
				<TOC headings={headings} activeHeadings={activeHeadings} />
			)}
		</div>
	);
};
