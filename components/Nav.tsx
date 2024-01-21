"use client";
import { useState } from "react";
import { MagicLink } from "./MagicLink";

export function Nav() {
	const [showMobileMenu, setShowMobileMenu] = useState(false);

	const toggleMobileMenu = () => {
		setShowMobileMenu(!showMobileMenu);
	};

	const closeMobileMenu = () => {
		setShowMobileMenu(false);
	};

	return (
		<nav
			className={`fixed bottom-0 z-10 w-full border-t bg-inherit px-6 py-4 sm:bottom-auto sm:top-0 sm:block sm:border-b sm:border-t-0 sm:text-xl ${
				showMobileMenu ? "h-fit" : "h-16"
			}`}
		>
			<div className="mx-auto flex w-full flex-col items-center justify-between sm:w-[45rem] sm:flex-row">
				<div className="flex w-full justify-between font-medium sm:w-auto">
					<MagicLink url="/">
						<span onClick={closeMobileMenu}>Macguire Rintoul</span>
					</MagicLink>

					<button className="sm:hidden" onClick={toggleMobileMenu}>
						{showMobileMenu ? "Close" : "Menu"}
					</button>
				</div>

				<div
					className={`mt-2 flex w-full flex-col sm:mt-0 sm:block sm:w-auto ${
						showMobileMenu ? "block" : "hidden"
					}`}
					onClick={closeMobileMenu}
				>
					<MagicLink className="mb-2" url="/">
						Home
					</MagicLink>
					<MagicLink className="mb-2 sm:ml-4" url="/about">
						About
					</MagicLink>
					<MagicLink className="mb-2 sm:ml-4" url="/blog">
						Blog
					</MagicLink>
					<MagicLink className="mb-2 sm:ml-4" url="/photos">
						Photos
					</MagicLink>
					<MagicLink className="mb-2 sm:ml-4" url="/contact">
						Contact
					</MagicLink>
				</div>
			</div>
		</nav>
	);
}
