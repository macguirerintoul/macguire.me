"use client";
import React from "react";
import { getMDXComponent } from "mdx-bundler/client";
import Image from "next/image";
import { ImageProps } from "next/image";
import { MagicLink } from "./MagicLink";
import { MDXComponents } from "mdx/types";

type NewImageProps = Omit<
	ImageProps,
	"src" | "alt" | "width" | "height" | "placeholder"
> & {
	src?: ImageProps["src"] | undefined;
	alt?: ImageProps["alt"] | undefined;
	width?: ImageProps["width"] | string | undefined;
	height?: ImageProps["height"] | string | undefined;
	placeholder?: ImageProps["placeholder"] | string | undefined;
};


const components: MDXComponents = {
	a: (props: React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>) => {
		console.log(props.children)
		const content = typeof props.children == 'code' ? (<>{props.children.props.children}</>)
		if (typeof props.children == 'code') {
			return
		})
		return <MagicLink href={props.href as string}>{content}</MagicLink>;
	},
	img: (props: NewImageProps) => {
		const newAlt: string =
			typeof props.alt === "string" ? props.alt : "no alt provided";
		const newSrc: string = typeof props.src === "string" ? props.src : "nosrc";
		return (
			<Image
				alt={newAlt}
				width={Number(props.width)}
				height={Number(props.height)}
				src={newSrc}
				placeholder="blur"
				blurDataURL={props.blurDataURL}
			/>
		);
	},
};

export function PostContent({ code }: { code: string }) {
	const Component = React.useMemo(() => getMDXComponent(code), [code])
	return <Component components={components} />;
}
