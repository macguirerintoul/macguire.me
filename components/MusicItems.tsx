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
		<div className="mx-auto my-4 grid w-5xl max-w-6xl grid-cols-5 gap-2 py-0 pb-12 sm:flex-row sm:pt-4">
			{items.map((item, index) => {
				if (loading) {
					return (
						<div key={index} className="flex-1 basis-full no-underline">
							<div className="flex flex-col rounded-lg bg-white p-2 shadow dark:bg-neutral-900">
								<div className="aspect-square w-full animate-pulse rounded bg-neutral-200 dark:bg-neutral-800"></div>
								<div className="my-0 mt-2 w-full space-y-2 text-lg leading-tight">
									<div className="h-5 w-3/4 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800"></div>
									<div className="h-5 w-1/2 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800"></div>
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
							className="motion-safe:animate-floatUpFast relative flex flex-col rounded-lg bg-white p-2 drop-shadow sm:flex-col sm:items-start dark:bg-neutral-900"
							style={{ "--animation-order": index } as React.CSSProperties}
						>
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
								<div className="truncate font-medium sm:mt-2">{item.title}</div>
								<div className="truncate text-neutral-500 dark:text-neutral-400">
									{item.subtitle}
								</div>
							</figcaption>
						</figure>
					</MagicLink>
				);
			})}
		</div>
	);
};

export { MusicItems };
