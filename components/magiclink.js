import Link from 'next/link'

// Automatically use either <g-link> or <a> depending on whether URL is internal or external
export default function MagicLink(props) {
	if (props.url.includes("://")) {
		return <a href={props.url} target="_blank" rel="noopener">{props.children}</a>
	} else {
		return <Link href={props.url}>{props.children}</Link>
	}
}
