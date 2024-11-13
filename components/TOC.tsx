"use client";
import { Toc } from "@stefanprobst/rehype-extract-toc";
import { useHeadsObserver } from "lib/clientUtils";

const TOC = ({ headings }: { headings: Toc }) => {
	const activeIds: string[] = useHeadsObserver();
	return (
		<aside className="toc sticky top-20 self-start text-base">
			<p className="mb-1 font-semibold">Contents</p>
			<ul className="m-0 list-none pl-0">
				{headings.map((item, index) => {
					return (
						<li key={index}>
							<a
								href={`#${item.id}`}
								className={`no-underline transition-colors duration-200
									${
										item.id && activeIds.includes(item.id)
											? "text-black dark:text-white"
											: "text-neutral-500"
									}`}
							>
								{item.value}
							</a>
							{item.children && (
								<ul className="my-1 list-none pl-4">
									{item.children.map((item, index) => (
										<li key={index}>
											<a
												href={`#${item.id}`}
												className={`no-underline transition-colors duration-200
									${
										item.id && activeIds.includes(item.id)
											? "text-black dark:text-white"
											: "text-neutral-500 "
									}`}
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
