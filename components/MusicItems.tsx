import Image from "next/image";
import { MagicLink } from "./MagicLink";
import { MusicItem } from "@/types/music";

const MusicItems = ({
	musicItems,
	loading,
}: {
	musicItems: MusicItem[];
	loading?: boolean;
}) => {
	const items = loading ? Array(5).fill(0) : musicItems || [];

	return (
		<div className="mx-auto w-5xl my-4 grid grid-cols-5 max-w-6xl gap-2 py-0 pb-12 sm:flex-row sm:pt-4">
			{items.map((item, index) => {
				if (loading) {
					return (
						<div
							key={index}
							className="flex-1 basis-full no-underline"
						>
							<div
								className="flex flex-col rounded-lg bg-white p-2 drop-shadow dark:bg-neutral-900"
							>
								<div className="w-full aspect-square rounded bg-gray-200 animate-pulse dark:bg-gray-800"></div>
								<div className="my-0 w-full text-lg leading-tight mt-2 space-y-2">
									<div className="h-5 w-3/4 rounded bg-gray-200 animate-pulse dark:bg-gray-800"></div>
									<div className="h-5 w-1/2 rounded bg-gray-200 animate-pulse dark:bg-gray-800"></div>
								</div>
							</div>
						</div>
					);
				}

				return (
					<MagicLink
						key={item.title}
						arrow={false}
						href={item.url}
						className="flex-1 basis-full no-underline transition duration-100 motion-safe:hover:-translate-y-0.5"
					>
						<figure
							className="flex flex-col rounded-lg bg-white p-2 drop-shadow motion-safe:animate-floatUpFast sm:flex-col sm:items-start dark:bg-neutral-900"
							style={{ "--animation-order": index } as React.CSSProperties}
						>
							<Image
								alt={item.title}
								src={item.imageUrl}
								width={240}
								height={240}
								placeholder="blur"
								className="rounded"
								blurDataURL={item.blurDataURL}
							/>
							<figcaption className="my-0 w-full text-lg leading-tight text-black dark:text-neutral-300">
								<div className="font-medium sm:mt-2 truncate">{item.title}</div>
								<div className="text-neutral-500 truncate">{item.subtitle}</div>
							</figcaption>
						</figure>
					</MagicLink>
				);
			})}
		</div>
	);
};

export { MusicItems };