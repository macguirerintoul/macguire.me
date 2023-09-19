import Image from "next/image";
import { MagicLink } from "./MagicLink";
import { Album } from "types";

const Albums = ({ albums }: { albums: Album[] }) => {
	return (
		<div className="py-0 mx-auto flex flex-col sm:flex-row max-w-6xl justify-center gap-2 pb-12 sm:pt-4">
			{albums.map(async (album, index) => {
				return ( 
						<figure
							className="motion-safe:animate-floatUpFast items-center flex flex-row sm:flex-col" key={album.title} 
							style={{ "--animation-order": index } as React.CSSProperties}
						>
							<MagicLink
								arrow={false}
								url={album.url} className="basis-1/5 mr-4"
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
							<figcaption className="my-0 text-xl text-neutral-600">
								<div className="mb-0 sm:mt-4 font-medium leading-none">
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
