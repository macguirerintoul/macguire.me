"use client";
import { Toc } from "@stefanprobst/rehype-extract-toc";
import { useHeadsObserver } from "lib/clientutils";
const TOC = ({ headings }: { headings: Toc }) => {
	const { activeId } = useHeadsObserver();
	return (
		<aside className="toc">
			<p>Contents</p>
			<ul className="util-unstyled-list">
				{headings.map((item, index) => {
					return (
						<li key={index}>
							<a
								href={`#${item.id}`}
								className={item.id === activeId ? "toc-active" : undefined}
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
