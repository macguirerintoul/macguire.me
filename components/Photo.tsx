import Image from "next/image";
import {
	Camera,
	FilmStrip,
	Aperture,
	HourglassHigh,
	FrameCorners,
} from "@phosphor-icons/react/dist/ssr";

const Photo = (props: {
	fileName: string;
	caption: string;
	iso: string;
	aperture: string;
	camera: string;
	shutterSpeed: string;
	focalLength: string;
}) => {
	return (
		<figure>
			<Image
				key={props.fileName}
				alt={props.fileName}
				src={"/photos/" + props.fileName}
				width={600}
				height={900}
			/>
			<figcaption>{props.caption}</figcaption>
			<div className="flex justify-between text-lg text-gray-500">
				<label className="flex">
					<Camera className="mr-1 self-center" size={20} />
					<span>{props.camera}</span>
				</label>
				<label className="flex">
					<FilmStrip className="mr-1 self-center" size={20} />
					ISO {props.iso}
				</label>
				<label className="flex">
					<Aperture className="mr-1 self-center" size={20} />
					ƒ/{props.aperture}
				</label>
				<label className="flex">
					<HourglassHigh className="mr-1 self-center" size={20} />
					{props.shutterSpeed}
				</label>
				<label className="flex">
					<FrameCorners size={20} className="mr-1 self-center" />
					{props.focalLength}mm
				</label>
			</div>
		</figure>
	);
};

export { Photo };
