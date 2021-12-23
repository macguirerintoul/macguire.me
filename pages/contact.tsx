import Layout from "../components/layout";
import MagicLink from "../components/magiclink";
import Head from "next/head";
import * as React from "react";

type StateType = {
	submissionStatus: "default" | "success" | "error"
  email: string; 
	message: string;
};

class Contact extends React.Component<unknown, StateType> {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {
			submissionStatus: "default",
			email: "",
			message: "",
		};
	}

	handleInputChange = (event) => {
		const target = event.target;
		const value: string = target.type === "checkbox" ? target.checked : target.value;
		const name: string = target.name;
		this.setState({
			[name]: value,
		} as Pick<StateType, keyof StateType>);
	};

	handleSubmit = (event) => {
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
			<Layout>
				<Head>
					<title>Contact ✦ Macguire Rintoul</title>
				</Head>
				<h1>Contact</h1>
				<hr />

				<form
					className="contact-form"
					method="POST"
					name="Contact"
					action="/api/contact"
					onSubmit={this.handleSubmit}
				>
					{this.state.submissionStatus === "default" && (
						<div>
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
								required
							/>

							<button type="submit">Send</button>
						</div>
					)}
				</form>
				{feedback}
			</Layout>
		);
	}
}

export default Contact;
