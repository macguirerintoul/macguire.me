"use client";
import { AdvancedVideo } from "@cloudinary/react";
import { FunctionComponent, ReactElement } from "react";

import { Cloudinary } from "@cloudinary/url-gen";

export const MagicVideo: FunctionComponent<{
	source: string;
	path: string;
	className?: string;
}> = ({ source, path, className }) => {
	let element: ReactElement = <></>;
	if (source == "vimeo") {
		element = (
			<iframe
				className="aspect-video w-full"
				src={"https://player.vimeo.com/video/" + path + "?byline=0&portrait=0"}
				allow="fullscreen"
				allowFullScreen
			></iframe>
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
