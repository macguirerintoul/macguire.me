import Image from "next/image";
import { MagicLink } from "./MagicLink";
import { Album } from "types";

const Albums = ({ albums }: { albums: Album[] }) => {
	return (
		<div className="mx-auto flex max-w-6xl justify-center gap-2 py-12">
			{albums.map(async (album, index) => {
				return (
					<div key={album.title} className="mx-2 flex max-w-sm flex-col ">
						<figure>
							<MagicLink
								url={album.url}
								className="transition-transform duration-100 after:hidden  motion-safe:animate-floatUpFast"
								style={{ "--animation-order": index } as React.CSSProperties}
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
							<figcaption className="text-xl text-gray-600">
								<p className="mb-0 mt-2 font-medium">{album.artist}</p>
								<p>{album.title}</p>
							</figcaption>
						</figure>
					</div>
				);
			})}
		</div>
	);
};

export { Albums };
