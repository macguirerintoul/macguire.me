import Script from "next/script";
import { MDXRemote } from "next-mdx-remote";
import React, { ReactNode, useState } from "react";
import { motion } from "framer-motion";
import { IProject } from "../lib/types";
import {
	Blockquote,
	ContentSwitcher,
	MagicImage,
	MagicVideo,
	Showcase,
} from "./index";

const components = { Blockquote, MagicVideo, Showcase, MagicImage };

const parentVariants = {
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
		},
	},
	hidden: {
		opacity: 1,
	},
};

const itemVariants = {
	visible: { opacity: 1, y: 0, transition: { ease: "easeOut", duration: 0.4 } },
	hidden: { opacity: 0, y: 60 },
};

export default function ProjectContent(props: {
	project: IProject;
	imgSrc: StaticImageData;
}) {
	const [contentState, setContentState] = useState<"project" | "process">(
		"project"
	);

	let content: ReactNode = null;
	if (contentState == "project") {
		content = (
			<MDXRemote {...props.project.mdxProject} components={components} />
		);
	} else if (contentState == "process") {
		content = (
			<MDXRemote {...props.project.mdxProcess} components={components} />
		);
	}

	return (
		<motion.div
			className="grid-fill"
			initial="hidden"
			animate="visible"
			variants={parentVariants}
		>
			<Script src="https://player.vimeo.com/api/player.js" />
			<motion.div className="grid-fill" variants={itemVariants}>
				<h1>{props.project.meta.title}</h1>
				<hr />
			</motion.div>
			<motion.section className="hero" variants={itemVariants}>
				<p dangerouslySetInnerHTML={{ __html: props.project.meta.summary }} />
			</motion.section>
			<motion.div className="overview-image" variants={itemVariants}>
				<MagicImage
					type="next"
					src={props.imgSrc}
					alt={"Screenshot of " + props.project.meta.title}
					placeholder="blur"
				/>
			</motion.div>
			{!props.project.meta.parentProject && (
				<ContentSwitcher
					handler={setContentState}
					contentState={contentState}
					variants={itemVariants}
				/>
			)}
			<motion.div className="content" variants={itemVariants}>
				{content}
			</motion.div>
			{!props.project.meta.parentProject && (
				<ContentSwitcher
					handler={setContentState}
					contentState={contentState}
					variants={itemVariants}
				/>
			)}
		</motion.div>
	);
}
