"use client";
import { toMonthString } from "lib/utilities";

const ExifData = (props: {
	iso: string;
	aperture: string;
	camera: string;
	shutterSpeed: string;
	focalLengthIn35mmFormat: string;
	timestamp: Date;
}) => {
	return (
		<div className="font-mono grid shrink-0 basis-full grid-cols-2 grid-rows-3 flex-wrap items-start justify-between font-light text-neutral-500 sm:grid-cols-3 md:basis-3/5 md:text-right">
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
			<div className="col-start-2 row-start-2 text-right sm:col-start-3 sm:row-start-1 sm:text-left md:text-right">
				{props.aperture}
			</div>
			<div className="col-start-2 row-start-3 text-right sm:col-start-3 sm:row-start-2 sm:text-left md:text-right">
				{props.shutterSpeed}
			</div>
		</div>
	);
};

export { ExifData };
