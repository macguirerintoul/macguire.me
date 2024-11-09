import Link from "next/link";
import React, {   ReactNode } from "react";

// Automatically use either <Link> or <a> depending on whether URL is internal or external
const MagicLink = ({
	href,
	children,
	style,
	className,
	arrow = true,
}: {
	href: string;
	children?: ReactNode | string;
	style?: React.CSSProperties;
	className?: string;
	arrow?: boolean;
}) => {
	if (href.includes("://")) {
		return (
			<a
				style={style}
				href={href}
				target="_blank"
				className={(className ? className : "") + (arrow ? " inline-flex items-center" : "")}
				rel="noopener noreferrer"
			>
				{children}
				{arrow && (
					<svg
						className=" fill-indigo-600 "
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 256 256"
					>
						<path d="M200 64v104a8 8 0 0 1-16 0V83.31L69.66 197.66a8 8 0 0 1-11.32-11.32L172.69 72H88a8 8 0 0 1 0-16h104a8 8 0 0 1 8 8Z" />
					</svg>
				)}
			</a>
		);
	} else {
		return (
			<Link href={href} style={style} className={className}>
				{children}
			</Link>
		);
	}
};

export { MagicLink };
