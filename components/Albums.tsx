import Image from "next/image";
import { MagicLink } from "./MagicLink";
import { Album } from "types";
import { getPlaiceholder } from "plaiceholder";

const Albums = ({ albums }: { albums: Album[] }) => {
	return (
		<div className="albums">
			{albums.map(async (album) => {
				return (
					<MagicLink key={album.title} url={album.url}>
						<figure className="card">
							<Image
								alt={album.title}
								src={album.image}
								width={200}
								height={200}
								placeholder="blur"
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
