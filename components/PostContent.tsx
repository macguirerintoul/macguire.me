"use client";
import React, { ReactElement } from "react";
import { getMDXExport } from "mdx-bundler/client";
import Image from "next/image";
import { ImageProps } from "next/image";
import { MagicLink } from "./MagicLink";

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

const components = {
	a: ({
		href,
		children,
	}: {
		href: string;
		children: ReactElement | string;
	}) => {
		return <MagicLink url={href}>{children}</MagicLink>;
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
	const mdxExport = getMDXExport(code);
	const Component = React.useMemo(() => mdxExport.default, [mdxExport.default]);
	return <Component components={components} />;
}
