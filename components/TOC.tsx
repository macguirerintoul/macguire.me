"use client";
import { Toc } from "@stefanprobst/rehype-extract-toc";
import { useHeadsObserver } from "lib/clientUtils";

const TOC = ({ headings }: { headings: Toc }) => {
	const activeIds: string[] = useHeadsObserver();
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
									item.id && activeIds.includes(item.id)
										? "toc-active"
										: undefined
								}
							>
								{item.value}
							</a>
							{item.children && (
								<ul>
									{item.children.map((item, index) => (
										<li key={index}>
											<a
												href={`#${item.id}`}
												className={
													item.id && activeIds.includes(item.id)
														? "toc-active"
														: undefined
												}
											>
												{item.value}
											</a>
										</li>
									))}
								</ul>
							)}
						</li>
					);
				})}
			</ul>
		</aside>
	);
};
export { TOC };
