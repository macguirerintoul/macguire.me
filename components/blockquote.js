import MagicLink from "./magiclink"

export default function Blockquote(props) {
	let source = ''
	if (props.url && props.url.length > 0) {
		source = <span>— <MagicLink  url={props.url}>{ props.source }</MagicLink></span>
	} else {
		source = <span>{ props.source }</span>
	}
	return (
		<blockquote>
		{props.children}
		{props.source.length > 0 && 
			<cite>{source}</cite>
		}
		</blockquote>
	)
}