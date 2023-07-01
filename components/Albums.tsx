import Image from "next/image";
import { MagicLink } from "./MagicLink";
import { Album } from "types";

const Albums = ({ albums }: { albums: Album[] }) => {
	return (
		<div className="albums mx-auto flex max-w-6xl justify-center gap-2 py-12">
			{albums.map(async (album, index) => {
				return (
					<MagicLink
						key={album.title}
						url={album.url}
						className=" transition-transform  duration-100 after:hidden motion-safe:animate-floatUpFast"
						style={{ "--animation-order": index } as React.CSSProperties}
					>
						<figure className="mx-2 shadow-lg ">
							<Image
								alt={album.title}
								src={album.image}
								width={200}
								height={200}
								placeholder="blur"
								className=" rounded "
								blurDataURL={album.blurDataURL}
							/>
						</figure>
					</MagicLink>
				);
			})}
		</div>
	);
};

export { Albums };
