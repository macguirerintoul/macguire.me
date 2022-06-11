import React from "react";
import { MagicLink, ThemeSwitcher } from "./index";

interface IState {
	showMobileMenu: boolean;
	hasHomeBar: boolean;
}

class Header extends React.Component<unknown, IState> {
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
			<header>
				<nav
					className={`navbar container ${
						this.state.showMobileMenu ? "is-active" : ""
					} ${this.state.hasHomeBar ? "util-has-home-bar" : ""} `}
				>
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
						<ThemeSwitcher />
						<MagicLink url="/">
							<span className="link home">Home</span>
						</MagicLink>
						<MagicLink url="/about">
							<span className="link about">About</span>
						</MagicLink>
						<MagicLink url="/contact">
							<span className="link contact">Contact</span>
						</MagicLink>
					</div>
				</nav>
			</header>
		);
	}
}

export default Header;
