import React from "react";
import { ResumeType } from "types";
import Experiences from "./Experiences";

interface Recognition {
	title: string;
	context: string;
}

interface IProps {
	title: string;
	items?: string[];
	recognition?: Recognition[];
	experience?: ResumeType["experience"];
	education?: ResumeType["education"];
}

export default function ResumeSection(props: IProps) {
	let content;
	if (typeof props.items !== "undefined") {
		content = props.items.map((item) => <div key={item as string}>{item}</div>);
	} else if (typeof props.recognition !== "undefined") {
		content = props.recognition.map((item) => (
			<div className="mb-2" key={item.title}>
				<h3 key={item.title}>{item.title}</h3>
				<h4 key={item.context}>{item.context}</h4>
			</div>
		));
	} else if (typeof props.experience !== "undefined") {
		content = <Experiences experience={props.experience} />;
	} else if (typeof props.education !== "undefined") {
		content = props.education.map((item) => (
			<div key={item.title}>
				<h3 key={item.title}>{item.title}</h3>
				<h4 key={item.context}>{item.context}</h4>
				<p>{item.description}</p>
			</div>
		));
	}
	return (
		<div className="mb-6">
			<h2>{props.title}</h2>
			{content}
		</div>
	);
}
