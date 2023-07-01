"use client";
import React from "react";
import { MagicLink } from "./index";

interface IState {
	showMobileMenu: boolean;
	hasHomeBar: boolean;
}

class Nav extends React.Component<unknown, IState> {
	constructor(props: unknown) {
		super(props);
		this.state = { showMobileMenu: false, hasHomeBar: false };
	}

	toggleMobileMenu = () => {
		this.setState({ showMobileMenu: !this.state.showMobileMenu });
	};

	closeMobileMenu = () => {
		this.setState({ showMobileMenu: false });
	};

	componentDidMount = () => {
		const isiPhone: boolean = [
			"iPad Simulator",
			"iPhone Simulator",
			"iPod Simulator",
			"iPad",
			"iPhone",
			"iPod",
		].includes(navigator.platform);
		const aspect: number = window.screen.width / window.screen.height;
		if (isiPhone && aspect.toFixed(3) === "0.462") {
			this.setState({ hasHomeBar: true });
		}
	};

	render() {
		return (
			<nav
				className={`fixed bottom-0 w-full border-t bg-inherit px-4 py-4 sm:bottom-auto sm:top-0 sm:block sm:border-b sm:border-t-0 sm:text-xl ${
					this.state.showMobileMenu ? "h-fit" : "h-16"
				}`}
			>
				<div className="mx-auto flex w-full flex-col items-center justify-between sm:w-[45rem] sm:flex-row">
					<div className="flex w-full justify-between font-medium sm:w-auto">
						<MagicLink url="/">
							<span onClick={this.closeMobileMenu}>Macguire Rintoul</span>
						</MagicLink>

						<button className="sm:hidden" onClick={this.toggleMobileMenu}>
							{this.state.showMobileMenu ? "Close" : "Menu"}
						</button>
					</div>

					<div
						className={`mt-2 flex w-full flex-col sm:mt-0 sm:block sm:w-auto ${
							this.state.showMobileMenu ? "block" : "hidden"
						}`}
						onClick={this.closeMobileMenu}
					>
						<MagicLink className="mb-2" url="/">
							Home
						</MagicLink>
						<MagicLink className="mb-2 sm:ml-2" url="/about">
							About
						</MagicLink>
						<MagicLink className="mb-2 sm:ml-2" url="/blog">
							Blog
						</MagicLink>
						<MagicLink className="mb-2 sm:ml-2" url="/contact">
							Contact
						</MagicLink>
					</div>
				</div>
			</nav>
		);
	}
}

export { Nav };
