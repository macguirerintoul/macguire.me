import Link from "next/link";
import React, { ReactElement } from "react";

// Automatically use either <Link> or <a> depending on whether URL is internal or external
export default function MagicLink(props: {
	url: string;
	children: ReactElement | string;
}) {
	if (props.url.includes("://")) {
		return (
			<a href={props.url} target="_blank" rel="noopener noreferrer">
				{props.children}
			</a>
		);
	} else {
		return <Link href={props.url}>{props.children}</Link>;
	}
}
