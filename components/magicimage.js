import Image from "next/image";
import { Image as CldImage, Transformation } from "cloudinary-react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

export default function MagicImage(props) {
	let element;
	if (props.type === "next") {
		element = <Image {...props} alt={props.alt} />;
	} else {
		element = (
			<CldImage
				cloudName="macguire"
				className={`magic-image ${props.className}`}
				publicId={props.path}
				alt={props.alt}
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
	return <Zoom overlayBgColorEnd="var(--background)">{element}</Zoom>;
}
