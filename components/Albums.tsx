import Image from "next/image";
import { MagicLink } from "./MagicLink";
import { Album } from "types";

const Albums = ({ albums }: { albums: Album[] }) => {
	return (
		<div className="mx-auto flex max-w-6xl flex-col justify-center gap-2 py-0 pb-12 sm:flex-row sm:pt-4">
			{albums.map(async (album, index) => {
				return (
					<figure
						className="flex flex-row items-center motion-safe:animate-floatUpFast sm:flex-col sm:items-start"
						key={album.title}
						style={{ "--animation-order": index } as React.CSSProperties}
					>
						<MagicLink arrow={false} url={album.url} className="mr-4 basis-1/5">
							<Image
								alt={album.title}
								src={album.image}
								width={200}
								height={200}
								placeholder="blur"
								className="rounded shadow-lg"
								blurDataURL={album.blurDataURL}
							/>
						</MagicLink>
						<figcaption className="my-0 text-xl text-neutral-600">
							<div className="mb-0 font-bold leading-none sm:mt-4">
								{album.title}
							</div>
							<div>{album.artist}</div>
						</figcaption>
					</figure>
				);
			})}
		</div>
	);
};

export { Albums };
