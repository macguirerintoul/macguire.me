import Image from "next/image";

const Albums = ({ albums }) => {
	return (
		<div className="albums">
			{albums.topalbums.album.map((album) => (
				<div key={album.name}>
					<Image
						alt={album.name}
						src={album.image[2]["#text"]}
						width={200}
						height={200}
					/>
					<div>{album.artist.name}</div>
					<div>{album.name}</div>
				</div>
			))}
		</div>
	);
};

export { Albums };
