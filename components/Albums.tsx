import Image from "next/image";
import { MagicLink } from "./MagicLink";
import { Album } from "types";

const Albums = ({ albums }: { albums: Album[] }) => {
	return (
		<div className="mx-auto flex max-w-6xl justify-center gap-2 pb-12 pt-4">
			{albums.map(async (album, index) => {
				return (
					<div key={album.title} className="mx-2 flex max-w-sm flex-col">
						<figure
							className="motion-safe:animate-floatUpFast"
							style={{ "--animation-order": index } as React.CSSProperties}
						>
							<MagicLink
								arrow={false}
								url={album.url}
							>
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
							<figcaption className="text-xl text-neutral-600">
								<p className="mb-0 mt-4 font-medium leading-none">
									{album.title}
								</p>
								<p>{album.artist}</p>
							</figcaption>
						</figure>
					</div>
				);
			})}
		</div>
	);
};

export { Albums };
