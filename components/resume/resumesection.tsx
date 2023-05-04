import React from "react";
import { ResumeType } from "../../lib/types";
import Experiences from "./Experiences";

interface IRecognition {
	title: string;
	context: string;
}

interface IProps {
	title: string;
	items?: string[];
	recognition?: IRecognition[];
	experience?: ResumeType["experience"];
	education?: ResumeType["education"];
}

export default function ResumeSection(props: IProps) {
	let content;
	if (typeof props.items !== "undefined") {
		content = props.items.map((item) => <div key={item as string}>{item}</div>);
	} else if (typeof props.recognition !== "undefined") {
		content = props.recognition.map((item) => (
			<div className="resume-item" key={item.title}>
				<h3 key={item.title}>{item.title}</h3>
				<h4 key={item.context}>{item.context}</h4>
			</div>
		));
	} else if (typeof props.experience !== "undefined") {
		content = <Experiences experience={props.experience} />;
	} else if (typeof props.education !== "undefined") {
		content = props.education.map((item) => (
			<div className="resume-item" key={item.title}>
				<h3 key={item.title}>{item.title}</h3>
				<h4 key={item.context}>{item.context}</h4>
				<p>{item.description}</p>
			</div>
		));
	}
	return (
		<div className="resume-section">
			<h2>{props.title}</h2>
			{content}
		</div>
	);
}
