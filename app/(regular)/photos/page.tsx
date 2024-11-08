import { titleTemplate } from "lib/utilities";
import { Metadata } from "next";
import { getPhotos } from "lib/photos";
import { Photo } from "components/Photo";

export const metadata: Metadata = {
	title: "Photos " + titleTemplate,
};

const Photos = async () => {
	const photos = await getPhotos();

	const firstColumn = photos.filter((_, index) => index % 4 === 0);
	const secondColumn = photos.filter((_, index) => index % 4 === 1);
	const thirdColumn = photos.filter((_, index) => index % 4 === 2);
	const fourthColumns = photos.filter((_, index) => index % 4 === 3);

	const columns = [firstColumn, secondColumn, thirdColumn, fourthColumns];

	return (
		<>
			<section>
				<h1>Photos</h1>
				<hr />
			</section>
			<div className="grid grid-cols-4 gap-2">
				{columns.map((column, index) => (
					<div key={index} className="flex flex-col gap-2">
						{columns[index].map((photo) => (
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
					</div>
				))}
			</div>
		</>
	);
};

export default Photos;
