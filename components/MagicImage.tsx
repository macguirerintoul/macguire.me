import Image, { StaticImageData } from "next/image";
import { Image as CldImage, Transformation } from "cloudinary-react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import React, { FunctionComponent } from "react";

export const MagicImage: FunctionComponent<{
	type?: string;
	alt: string;
	className?: string;
	path?: string;
	src?: StaticImageData;
	placeholder?: "blur" | "empty" | undefined;
}> = ({ type, alt, className, path, src, placeholder }) => {
	let element;
	if (type === "next") {
		element = (
			<Image src={src as StaticImageData} alt={alt} placeholder={placeholder} />
		);
	} else {
		element = (
			<CldImage
				cloudName="macguire"
				className={`magic-image ${className}`}
				publicId={path}
				alt={alt}
			>
				<Transformation
					width="auto"
					crop="scale"
					quality="auto"
					fetchFormat="auto"
				/>
			</CldImage>
		);
	}
	return <Zoom>{element}</Zoom>;
};
