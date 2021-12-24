import React, { ReactNode } from "react";

interface IProps {
	h2: string;
	children: ReactNode;
}

export default function ResumeBlock(props: IProps) {
	return (
		<>
			<h2>{props.h2}</h2>
			{props.children}
		</>
	);
}
