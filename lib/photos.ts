import exifr from "exifr";
import path from "path";
import fs from "fs";
import { getPlaiceholder } from "plaiceholder";

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
				caption: exifData.title.value,
				timestamp: exifData.DateTimeOriginal,
				focalLengthIn35mmFormat:
					Math.round(exifData.FocalLengthIn35mmFormat) + " mm",
				focalLength: Math.round(exifData.FocalLength) + " mm",
				camera: exifData.Model.replace("ILCE-", "α"),
				iso: "ISO " + exifData.ISO,
				aperture: "ƒ/" + exifData.FNumber,
				shutterSpeed:
					"1/" + Math.floor(1 / (exifData.ExposureTime ?? 1)) + " s",
				width: exifData.ExifImageWidth,
				height: exifData.ExifImageHeight,
				blurDataUrl: (await getPlaiceholder(photoBuffer)).base64,
			};
		})
	).then((results) => {
		return results.sort((a, b) => {
			return a.timestamp < b.timestamp ? 1 : a.timestamp > b.timestamp ? -1 : 0;
		});
	});
}
