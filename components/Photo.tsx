"use client";
import Image from "next/image";
import Zoom from "react-medium-image-zoom";
import { toMonthString } from "lib/utilities";
import { ExifData } from "./ExifData";

const Photo = (props: {
	fileName: string;
	caption: string;
	iso: string;
	aperture: string;
	camera: string;
	shutterSpeed: string;
	focalLength: string;
	focalLengthIn35mmFormat: string;
	width: number;
	height: number;
	blurDataUrl: string;
	timestamp: Date;
}) => {
	return (
		<>
			<figure className="mb-16 flex flex-col rounded-lg bg-neutral-100 p-8 dark:bg-neutral-900">
				<Zoom
					zoomImg={{
						src: "/photos/" + props.fileName,
						srcSet: "",
					}}
				>
					<Image
						key={props.fileName}
						alt={props.fileName}
						src={"/photos/" + props.fileName}
						width={props.width}
						height={props.height}
						className="mx-auto h-fit max-h-[90vh] w-auto"
						blurDataURL={props.blurDataUrl}
						placeholder="blur"
					/>
				</Zoom>
			</figure>
			{/* <ExifData
				iso={props.iso}
				aperture={props.aperture}
				camera={props.camera}
				shutterSpeed={props.shutterSpeed}
				focalLengthIn35mmFormat={props.focalLengthIn35mmFormat}
				timestamp={props.timestamp}
			/> */}
		</>
	);
};

export { Photo };
