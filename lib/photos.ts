import exifr from "exifr";
import path from "path";
import fs from "fs";

const photosDirectory = path.join(process.cwd(), "public/photos");

export async function getPhotos() {
	const fileNames = fs.readdirSync(photosDirectory);
	return Promise.all(
		// TODO sort by date
		fileNames.map(async (fileName) => {
			const photoPath = path.join(photosDirectory, fileName);
			const photoBuffer = fs.readFileSync(photoPath);
			const exifData = await exifr.parse(photoBuffer, true);
			console.log(exifData);

			return {
				fileName: fileName,
				caption: exifData.ObjectName,
				focalLength: Math.round(exifData.FocalLength) + "mm",
				camera: exifData.Model,
				iso: "ISO " + exifData.ISO,
				aperture: "ƒ/" + exifData.FNumber,
				shutterSpeed: "1/" + Math.floor(1 / (exifData.ExposureTime ?? 1)),
				width: exifData.ExifImageWidth,
				height: exifData.ExifImageHeight,
			};
		})
	).then((results) => results);
}
