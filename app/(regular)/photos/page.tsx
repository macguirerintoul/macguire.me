import { titleTemplate } from "lib/utilities";
import { Metadata } from "next";
import { getPhotos } from "lib/photos";
import { Photo } from "components/Photo";

export const metadata: Metadata = {
	title: "Photos " + titleTemplate,
};

const Photos = async () => {
	const photos = await getPhotos();
	console.log(photos);
	return (
		<>
			<section>
				<h1>Photos</h1>
				<hr />
				{photos.map((photo) => (
					<Photo
						key={photo.fileName}
						fileName={photo.fileName}
						aperture={photo.aperture}
						focalLength={photo.focalLength}
						iso={photo.iso}
						camera={photo.camera}
						caption={photo.caption}
						shutterSpeed={photo.shutterSpeed}
					/>
				))}
			</section>
		</>
	);
};

export default Photos;
