// modified from https://nikolovlazar.com/blog/generating-blur-for-dynamic-images-nextjs
import { getPlaiceholder } from "plaiceholder";
import { Node } from "unist";
import path from "path";
import imageSize from "image-size";
import fs from "fs";
import { visit } from "unist-util-visit";

type ImageNode = {
	type: "element";
	tagName: "img";
	properties: {
		src: string;
		height?: number;
		width?: number;
		blurDataURL?: string;
		placeholder?: "blur" | "empty";
	};
};

function isImageNode(node: Node): node is ImageNode {
	const img = node as ImageNode;
	return (
		img.type === "element" &&
		img.tagName === "img" &&
		img.properties &&
		typeof img.properties.src === "string"
	);
}

async function addProps(node: ImageNode): Promise<void> {
	let blur64: string;

	const isExternal = node.properties.src.startsWith("http");
	if (!isExternal) {
		const imageRes = fs.promises.readFile(
			path.join(process.cwd(), "public", node.properties.src)
		);
		const arrayBuffer = await Promise.resolve(imageRes).then(function (buffer) {
			return buffer;
		});
		blur64 = (await getPlaiceholder(arrayBuffer)).base64;
	} else {
		const image = await fetch(node.properties.src);

		const arrayBuffer = await image.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer);

		const res = imageSize(buffer);
		node.properties.width = res.width;
		node.properties.height = res.height;

		blur64 = (await getPlaiceholder(buffer)).base64;
	}
	node.properties.blurDataURL = blur64;
	node.properties.placeholder = "blur";
}

const imageMetadata = () => {
	return async function transformer(tree: Node): Promise<Node> {
		const images: ImageNode[] = [];
		visit(tree, "element", (node) => {
			if (isImageNode(node)) {
				images.push(node);
			}
		});
		for (const image of images) {
			await addProps(image);
		}
		return tree;
	};
};

export default imageMetadata;
