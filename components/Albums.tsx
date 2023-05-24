import Image from "next/image";

const Albums = ({ albums }) => {
	return (
		<div className="albums">
			{albums.map((album) => (
				<div key={album.title}>
					<Image alt={album.title} src={album.image} width={200} height={200} />
					<div>{album.artist}</div>
					<div>{album.title}</div>
				</div>
			))}
		</div>
	);
};

export { Albums };
