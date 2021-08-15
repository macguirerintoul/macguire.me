import {Image,  Transformation} from 'cloudinary-react';

export default function MagicImage(props) {
	return ( 
			<Image cloudName="macguire" className="magic-image" publicId={props.path} alt={props.alt}>
				<Transformation width="auto" crop="scale"  quality="auto" fetchFormat="auto" />
			</Image> 	 
	)
} 
 