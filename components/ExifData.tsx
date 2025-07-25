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
		<div className="font-mono flex flex-wrap text-neutral-500 sm:grid-cols-3 md:basis-3/5">
			<div className="basis-1/3">{toMonthString(props.timestamp)}</div>
			<div className="basis-1/3">{props.camera}</div>
			<div className="basis-1/3" title="35 mm film equivalent">
				~{props.focalLengthIn35mmFormat}
			</div>
			<div>{props.iso}</div>
			<div>{props.aperture}</div>
			<div>{props.shutterSpeed}</div>
		</div>
	);
};

export { ExifData };
