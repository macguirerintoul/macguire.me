"use client";
import { Toc } from "@stefanprobst/rehype-extract-toc";
const TOC = ({
	headings,
	activeHeadings = [],
}: {
	headings: Toc;
	activeHeadings: string[];
}) => {
	console.log(activeHeadings);
	return (
		<aside className="toc">
			<p>Contents</p>
			<ul className="util-unstyled-list">
				{headings.map((item, index) => {
					return (
						<li key={index}>
							<a
								href={`#${item.id}`}
								className={
									item.id && activeHeadings.includes(item.id)
										? "toc-active"
										: undefined
								}
							>
								{item.value}
							</a>
						</li>
					);
				})}
			</ul>
		</aside>
	);
};
export { TOC };
