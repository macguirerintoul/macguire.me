"use client";
import { MagicLink } from "components";
import { titleTemplate } from "lib/utilities";
import { Metadata } from "next";
import * as React from "react";

export const metadata: Metadata = {
	title: "Contact " + titleTemplate,
};

type StateType = {
	submissionStatus: "default" | "success" | "error";
	email: string;
	message: string;
};

class Contact extends React.Component<never, StateType> {
	constructor(props: never) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {
			submissionStatus: "default",
			email: "",
			message: "",
		};
	}

	handleInputChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const target = event.target;
		this.setState({
			[target.name]: target.value,
		} as Pick<StateType, keyof StateType>);
	};

	handleSubmit = (event: React.SyntheticEvent) => {
		fetch("/api/contact", {
			method: "POST",
			body: JSON.stringify({
				email: this.state.email,
				message: this.state.message,
			}),
		})
			.then((response) => {
				console.log(response);
				if (response.status == 200) {
					this.setState({ submissionStatus: "success" });
				} else {
					this.setState({ submissionStatus: "error" });
				}
			})
			.catch((error) => {
				console.error(error);
				this.setState({ submissionStatus: "error" });
			});
		event.preventDefault();
	};

	render() {
		let feedback: React.ReactNode;
		if (this.state.submissionStatus === "success") {
			feedback = (
				<div className="feedback">
					<h2>Thanks! Message sent.</h2>
					<p>I&apos;ll get back to you shortly.</p>
					<p>
						<MagicLink url="/">Back home</MagicLink>
					</p>
				</div>
			);
		} else if (this.state.submissionStatus === "error") {
			feedback = (
				<div className="feedback">
					<h2>Error</h2>
					<p>
						My apologies. firstname.lastname@gmail.com also works. Here is your
						message:
					</p>
					<p>{this.state.message}</p>
					<p>
						<MagicLink url="/">Back home</MagicLink>
					</p>
				</div>
			);
		}

		return (
			<>
				<section>
					<h1>Contact</h1>
					<hr />

					{this.state.submissionStatus === "default" && (
						<form
							className="contact-form"
							method="POST"
							name="Contact"
							action="/api/contact"
							onSubmit={this.handleSubmit}
						>
							<label htmlFor="email">Your email</label>
							<input
								value={this.state.email}
								onChange={this.handleInputChange}
								type="email"
								name="email"
								required
							/>

							<label htmlFor="message">Message</label>
							<textarea
								value={this.state.message}
								onChange={this.handleInputChange}
								name="message"
								rows={8}
								required
							/>

							<button type="submit">Send</button>
						</form>
					)}

					{feedback}
				</section>
			</>
		);
	}
}

export default Contact;
