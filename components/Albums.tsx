import Image from "next/image";
import { MagicLink } from "./MagicLink";
import { Album } from "types";

const Albums = ({ albums }: { albums: Album[] }) => {
	return (
		<div className="mx-auto my-4 grid grid-cols-5 max-w-6xl gap-2 py-0 pb-12 sm:flex-row sm:pt-4">
			{albums.map(async (album, index) => {
				return (
					<MagicLink
						key={album.title}
						arrow={false}
						href={album.url}
						className="flex-1 basis-full no-underline transition duration-100 motion-safe:hover:-translate-y-0.5"
					>
						<figure
							className="flex flex-col rounded-lg bg-white p-2 drop-shadow motion-safe:animate-floatUpFast sm:flex-col sm:items-start dark:bg-neutral-900"
							style={{ "--animation-order": index } as React.CSSProperties}
						>
							<Image
								alt={album.title}
								src={album.image}
								width={240}
								height={240}
								placeholder="blur"
								className="rounded"
								blurDataURL={album.blurDataURL}
							/>
							<figcaption className="my-0 w-full text-lg leading-tight text-black dark:text-neutral-300">
								<div className="font-medium sm:mt-2 truncate">{album.title}</div>
								<div className="text-neutral-500 truncate">{album.artist}</div>
							</figcaption>
						</figure>
					</MagicLink>
				);
			})}
		</div>
	);
};

export { Albums };
