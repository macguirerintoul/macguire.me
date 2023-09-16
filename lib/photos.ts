import exifr from "exifr";
import path from "path";
import fs from "fs";

const photosDirectory = path.join(process.cwd(), "public/photos");

export async function getPhotos() {
	const fileNames = fs.readdirSync(photosDirectory);
	return Promise.all(
		fileNames.map(async (fileName) => {
			const photoPath = path.join(photosDirectory, fileName);
			const photoBuffer = fs.readFileSync(photoPath);
			const exifData = await exifr.parse(photoBuffer, true);

			return {
				fileName: fileName,
				caption: exifData.ObjectName,
				focalLength: exifData.FocalLength,
				camera: exifData.Model,
				iso: exifData.ISO,
				aperture: exifData.FNumber,
				shutterSpeed: "1/" + Math.floor(1 / (exifData.ExposureTime ?? 1)),
			};
		})
	).then((results) => results);
}
