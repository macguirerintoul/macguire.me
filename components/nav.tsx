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
				className={`${this.state.showMobileMenu ? "is-active" : ""} ${
					this.state.hasHomeBar ? "util-has-home-bar" : ""
				} `}
			>
				<div className="nav-container">
					<div className="navbar-always">
						<MagicLink url="/">
							<span className="navbar-name" onClick={this.closeMobileMenu}>
								Macguire Rintoul
							</span>
						</MagicLink>

						<button className="mobile-menu" onClick={this.toggleMobileMenu}>
							{this.state.showMobileMenu ? "Close" : "Menu"}
						</button>
					</div>

					<div className="navbar-sometimes">
						<MagicLink url="/">Home</MagicLink>
						<MagicLink url="/about">About</MagicLink>
						<MagicLink url="/contact">Contact</MagicLink>
					</div>
				</div>
			</nav>
		);
	}
}

export default Nav;
