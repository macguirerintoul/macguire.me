import { titleTemplate } from "lib/utilities";
import { Metadata } from "next";
import { getPhotos } from "lib/photos";
import { Photo } from "components/Photo";

export const metadata: Metadata = {
	title: "Photos " + titleTemplate,
};

const Photos = async () => {
	const photos = await getPhotos();
	return (
		<section>
			<h1>Photos</h1>
			<hr />

			{photos.map((photo) => (
				<Photo
					key={photo.fileName}
					fileName={photo.fileName}
					aperture={photo.aperture}
					focalLength={photo.focalLength}
					focalLengthIn35mmFormat={photo.focalLengthIn35mmFormat}
					iso={photo.iso}
					camera={photo.camera}
					caption={photo.caption}
					shutterSpeed={photo.shutterSpeed}
					blurDataUrl={photo.blurDataUrl}
					width={photo.width}
					height={photo.height}
					timestamp={photo.timestamp}
				/>
			))}
		</section>
	);
};

export default Photos;
