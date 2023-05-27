"use client";
const TOC = ({
	headings,
	activeHeadings = [],
}: {
	headings: { id: string; value: string; depth: number }[];
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
									activeHeadings.includes(item.id) ? "toc-active" : undefined
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
