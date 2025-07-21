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
		<figure className="mb-16 flex h-[80vh] flex-col rounded-lg bg-neutral-100 p-8 dark:bg-neutral-900">
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
					className={`aspect-[${props.width}/${props.height}] mx-auto h-fit w-auto`}
					blurDataURL={props.blurDataUrl}
					placeholder="blur"
				/>
			</Zoom>
		</figure>
	);
};

export { Photo };
