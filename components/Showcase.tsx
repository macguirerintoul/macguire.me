import { FunctionComponent } from "react";
import { MagicImage } from "./MagicImage";
import { MagicVideo } from "./MagicVideo";

export const Showcase: FunctionComponent<{
	orientation: string;
	path: string;
	type: string;
	source: string;
	content: string;
	alt: string;
}> = ({ orientation, path, type, source, content, alt }) => {
	return (
		<div className={`showcase showcase-${orientation || "vertical"}`}>
			<p>{content}</p>
			{type === "image" && <MagicImage path={path} alt={alt} />}
			{type === "video" && <MagicVideo source={source} path={path} />}
		</div>
	);
};
