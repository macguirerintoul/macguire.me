import Image from "next/image";
import { MagicLink } from "./MagicLink";

const Albums = ({ albums }) => {
	return (
		<div className="albums">
			{albums.map((album) => (
				<MagicLink key={album.title} url={album.url}>
					<figure className="card">
						<Image
							alt={album.title}
							src={album.image}
							width={200}
							height={200}
						/>
						{/* <figcaption>
						<div className="artist">{album.artist}</div>
						<div className="album-title">{album.title}</div>
					</figcaption> */}
					</figure>
				</MagicLink>
			))}
		</div>
	);
};

export { Albums };
