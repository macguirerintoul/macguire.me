"use client";
import Image from "next/image";
import Zoom from "react-medium-image-zoom";
import { toDateString } from "lib/utilities";

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
			<Zoom>
				<Image
					key={props.fileName}
					alt={props.fileName}
					src={"/photos/" + props.fileName}
					width={props.width}
					height={props.height}
					blurDataURL={props.blurDataUrl}
					placeholder="blur"
					sizes="1080px"
					className="w-full"
				/>
			</Zoom>
			<div className="mt-1.5 text-base">
				<figcaption>{props.caption}</figcaption>
				<span className="font-mono font-light text-gray-500">
					{props.timestamp.toString()} · {props.camera} ·{" "}
					<span title="35 mm film equivalent">
						~{props.focalLengthIn35mmFormat}
					</span>{" "}
					· {props.iso} · {props.aperture} · {props.shutterSpeed}
				</span>
			</div>
		</figure>
	);
};

export { Photo };
