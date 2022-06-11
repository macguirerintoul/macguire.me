import { Video, Transformation } from "cloudinary-react";

export default function MagicVideo(props) {
	let element;
	if (props.source == "vimeo") {
		element = (
			<div className="video-embed">
				{/* <!-- to be responsive, the iframe requires a wrapper --> */}
				<iframe
					src={
						"https://player.vimeo.com/video/" +
						props.path +
						"?byline=0&portrait=0"
					}
					frameBorder="0"
					allow="fullscreen"
					allowFullScreen
				></iframe>
			</div>
		);
	} else if (props.source == "cloudinary") {
		element = (
			<Video
				cloudName="macguire"
				// secure="true"
				muted={true}
				loop={true}
				autoPlay={
					typeof window !== "undefined" &&
					!window.matchMedia("(max-width: 480px)")
						? "autoplay"
						: false
				}
				// loading="lazy"
				publicId={props.path}
			>
				<Transformation quality="auto:eco" fetchFormat="auto" />
			</Video>
		);
	}
	return element;
}
