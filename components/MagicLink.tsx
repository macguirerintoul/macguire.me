import Link from "next/link";
import React, { ReactElement } from "react";

// Automatically use either <Link> or <a> depending on whether URL is internal or external
const MagicLink = (props: {
	url: string;
	children: ReactElement | string;
	style?: React.CSSProperties;
}) => {
	if (props.url.includes("://")) {
		return (
			<a
				style={props.style}
				href={props.url}
				target="_blank"
				rel="noopener noreferrer"
			>
				{props.children}
			</a>
		);
	} else {
		return (
			<Link href={props.url} style={props.style}>
				{props.children}
			</Link>
		);
	}
};

export { MagicLink };
