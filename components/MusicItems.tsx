import Image from "next/image";
import { MagicLink } from "./MagicLink";
import { MusicItem } from "@/types/music";
import { AnimatePresence, motion } from "framer-motion";

const MusicItems = ({
	musicItems,
	loading,
}: {
	musicItems: MusicItem[];
	loading?: boolean;
}) => {
	const items = loading ? Array(5).fill(0) : musicItems || [];

	return (
		<div className="mx-auto my-4 grid w-5xl max-w-6xl grid-cols-5 gap-2 py-0 pb-12 sm:flex-row sm:pt-4">
			<AnimatePresence mode="wait">
				{items.map((item, index) => {
					if (loading) {
						return (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -20 }}
								transition={{
									duration: 0.3,
									delay: index * 0.05,
									ease: "easeOut",
								}}
								className="flex-1 basis-full no-underline"
							>
								<figure className="relative flex flex-col rounded-lg bg-white p-2 drop-shadow sm:flex-col sm:items-start dark:bg-neutral-900">
									<div className="aspect-square w-full animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
									<figcaption className="my-0 mt-2 w-full space-y-2 leading-tight">
										<div className="h-5 w-3/4 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
										<div className="h-5 w-1/2 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
									</figcaption>
								</figure>
							</motion.div>
						);
					}

					return (
						<motion.div
							key={item.title + Math.random()}
							initial={{ opacity: 0, y: 16 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -16 }}
							transition={{
								duration: 0.2,
								delay: index * 0.03,
								ease: "easeInOut",
							}}
						>
							<MagicLink
								key={item.index}
								arrow={false}
								href={item.url}
								className="flex-1 basis-full no-underline transition duration-100 motion-safe:hover:-translate-y-0.5"
							>
								<figure
									data-mbid={item.mbid}
									className="motion-safe:animate-floatUpFast relative flex flex-col rounded-lg bg-white p-2 drop-shadow sm:flex-col sm:items-start dark:bg-neutral-900"
									style={{ "--animation-order": index } as React.CSSProperties}
								>
									{/* todo next url is requesting w=640, does this need to be optimized? */}
									<Image
										alt={item.title}
										src={item.imageUrl}
										width={240}
										height={240}
										placeholder="blur"
										blurDataURL={item.blurDataURL}
										className="aspect-square rounded object-cover"
									/>
									<figcaption className="my-0 w-full leading-tight text-black dark:text-neutral-300">
										<div className="truncate font-medium sm:mt-2">
											{item.title}
										</div>
										<div className="truncate text-neutral-500 dark:text-neutral-400">
											{item.subtitle}
										</div>
									</figcaption>
								</figure>
							</MagicLink>
						</motion.div>
					);
				})}
			</AnimatePresence>
		</div>
	);
};

export { MusicItems };
