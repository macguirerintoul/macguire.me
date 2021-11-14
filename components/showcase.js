import MagicImage from "./magicimage";
import MagicVideo from "./magicvideo";

export default function Showcase(props) {
	return (
		<div className={`showcase showcase--${props.orientation}`}>
			<p>{ props.content }</p>
			{props.type=== 'image' && <MagicImage  path={props.path} alt={props.alt} />}
			{props.type === 'video' && <MagicVideo source={props.source} path={props.path} />}
			{/* TODO code showcases???? */}
			{props.type === 'code' && <pre>props.children</pre>}
		</div>
	)
}  