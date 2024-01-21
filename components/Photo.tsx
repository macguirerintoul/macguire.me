"use client";
import Image from "next/image";
import Zoom from "react-medium-image-zoom";
import { toMonthString } from "lib/utilities";

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
		<figure className="mb-16">
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
					blurDataURL={props.blurDataUrl}
					placeholder="blur"
					className="w-full"
				/>
			</Zoom>
			<div className="mt-1.5 flex flex-wrap justify-between text-base">
				<figcaption className="shrink-0 basis-full md:basis-2/5">
					{props.caption}
				</figcaption>
				<div className="grid shrink-0 basis-full grid-cols-2 grid-rows-3 flex-wrap items-start justify-between font-mono font-light text-neutral-500 sm:grid-cols-3 md:basis-3/5 md:text-right">
					<div>{toMonthString(props.timestamp)}</div>
					<div className="col-start-1 sm:row-start-2">{props.camera}</div>
					<div
						className="col-start-1 sm:col-start-2 sm:row-start-1"
						title="35 mm film equivalent"
					>
						~{props.focalLengthIn35mmFormat}
					</div>
					<div className="col-start-2 row-start-1 text-right sm:row-start-2 sm:text-left md:text-right">
						{props.iso}
					</div>
					<div className="col-start-2 row-start-2 text-right sm:col-start-3 sm:row-start-1 sm:text-left md:text-right ">
						{props.aperture}
					</div>
					<div className="col-start-2 row-start-3 text-right sm:col-start-3 sm:row-start-2 sm:text-left md:text-right ">
						{props.shutterSpeed}
					</div>
				</div>
			</div>
		</figure>
	);
};

export { Photo };
