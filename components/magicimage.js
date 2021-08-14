import {Image,CloudinaryContext, Transformation} from 'cloudinary-react';

export default function MagicImage(props) {
	return (
		<CloudinaryContext cloudName="macguire">
			<Image className="magic-image" publicId={props.path}>
				<Transformation width="auto" crop="scale"  quality="auto" fetch-format="auto" />
			</Image> 	
		</CloudinaryContext>
	)
} 
 