"use client";
import { AdvancedVideo } from "@cloudinary/react";
import { FunctionComponent } from "react";

import { Cloudinary } from "@cloudinary/url-gen";

export const MagicVideo: FunctionComponent<{
	source: string;
	path: string;
	className?: string;
}> = ({ source, path, className }) => {
	let element;
	if (source == "vimeo") {
		element = (
			<div className="video-embed">
				{/* <!-- to be responsive, the iframe requires a wrapper --> */}
				<iframe
					src={
						"https://player.vimeo.com/video/" + path + "?byline=0&portrait=0"
					}
					frameBorder="0"
					allow="fullscreen"
					allowFullScreen
				></iframe>
			</div>
		);
	} else if (source == "cloudinary") {
		// Create a Cloudinary instance and set your cloud name.
		const cld = new Cloudinary({
			cloud: {
				cloudName: "macguire",
			},
		});
		const myVideo = cld.video(path);
		element = (
			<AdvancedVideo
				cldVid={myVideo}
				className={className}
				cldPoster="auto"
				autoPlay
				loop
				muted
			/>
		);
	}
	return <>{element}</>;
};
