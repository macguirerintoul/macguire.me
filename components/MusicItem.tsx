import Image from "next/image";
import { MagicLink } from "./MagicLink";
import { MusicItem as MusicItemType } from "@/types/music";
import { motion } from "framer-motion";

type Props = {
	item?: MusicItemType;
	isLoading: boolean;
	index: number;
};

const MusicItem = ({ item, isLoading, index }: Props) => {
	if (!item && !isLoading) return null;

	return (
		// todo motion link
		<motion.div
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
				arrow={false}
				href={item?.url || ""}
				className={`flex-1 basis-full no-underline transition duration-100 motion-safe:hover:-translate-y-0.5`}
			>
				<figure
					data-mbid={item?.mbid}
					className="relative flex flex-col rounded-lg bg-white p-2 shadow sm:flex-col sm:items-start dark:bg-neutral-900"
				>
					{isLoading ? (
						<div className="aspect-square w-full animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
					) : (
						<Image
							alt={item?.title || "Music item"}
							src={item?.imageUrl || ""}
							width={240}
							height={240}
							placeholder="blur"
							blurDataURL={item?.blurDataURL}
							className={`aspect-square animate-in rounded object-cover fade-in`}
						/>
					)}

					<figcaption className="my-0 w-full leading-tight text-black dark:text-neutral-300">
						{isLoading ? (
							<div className="mt-2 h-10 w-3/4 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
						) : (
							<>
								<div className="truncate font-medium sm:mt-2">
									{item?.title}
								</div>
								<div className="truncate text-neutral-500 dark:text-neutral-400">
									{item!.subtitle}
								</div>
							</>
						)}
					</figcaption>
				</figure>
			</MagicLink>
		</motion.div>
	);
};

export { MusicItem };
