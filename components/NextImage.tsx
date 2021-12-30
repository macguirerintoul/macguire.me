import * as React from "react";
import Image from "next/image";

const NextImage = React.forwardRef<
	HTMLDivElement,
	React.PropsWithChildren<{ src: string }>
>((props, ref) => {
	return <Image src={props.src} layout="fill" ref={ref} />;
});

NextImage.displayName = "NextImage";

export default NextImage;
