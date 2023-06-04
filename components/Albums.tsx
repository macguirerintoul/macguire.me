import Image from "next/image";
import { MagicLink } from "./MagicLink";
import { Album } from "types";

const Albums = ({ albums }: { albums: Album[] }) => {
	return (
		<div className="albums">
			{albums.map(async (album, index) => {
				return (
					<MagicLink
						key={album.title}
						url={album.url}
						style={{ "--animation-order": index } as React.CSSProperties}
					>
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
