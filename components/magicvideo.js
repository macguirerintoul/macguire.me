import {Video,CloudinaryContext } from 'cloudinary-react';

export default function MagicVideo(props) {
	let element = ''
	if (props.source == 'vimeo') {
		element = (<div className="video-embed">
			{/* <!-- to be responsive, the iframe requires a wrapper --> */}
			<iframe
				src={'https://player.vimeo.com/video/' + props.path + '?byline=0&portrait=0'}
				frameBorder="0"
				allow="fullscreen"
				allowFullScreen
			></iframe>
		</div>)
	} else if (props.source == 'cloudinary') {
		element = ( 
				<Video 
				cloudName="macguire"
				// secure="true"
				muted="muted"
				loop="true"
				autoPlay="autoplay"
				// loading="lazy"
				publicId={props.path}
			>
			{/* <Transformation quality="auto:eco" fetchFormat="auto" /> */}
		</Video> )
	}
	return (
		<div className="magic-video">
			{element}
		</div>
	)
}