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
			className={`motion-safe:animate-nav fixed bottom-0 z-10 w-full bg-inherit px-6 py-4 sm:bottom-auto sm:top-0 sm:block sm:border-b sm:border-t-0 dark:border-neutral-800 ${
				showMobileMenu ? "h-fit" : "h-16"
			}`}
			style={{ "--animation-order": 6 } as React.CSSProperties}
		>
			<div className="mx-auto flex w-full flex-col items-center justify-between sm:w-[45rem] sm:flex-row">
				<div className="flex w-full justify-between sm:w-auto">
					<MagicLink className="dark:text-neutral-400 text-neutral-600 no-underline" href="/">
						<span onClick={closeMobileMenu}>Macguire Rintoul</span>
					</MagicLink>

					<button className="sm:hidden" onClick={toggleMobileMenu}>
						{showMobileMenu ? "Close" : "Menu"}
					</button>
				</div>

				<div
					className={`flex w-full flex-col sm:mt-0 sm:block sm:w-auto ${
						showMobileMenu ? "block" : "hidden"
					}`}
					onClick={closeMobileMenu}
				>
					<MagicLink className="dark:text-neutral-400 text-neutral-600 no-underline" href="/">
						Home
					</MagicLink>
					<MagicLink
						className="dark:text-neutral-400 text-neutral-600 no-underline sm:ml-4"
						href="/about"
					>
						About
					</MagicLink>
					<MagicLink
						className="dark:text-neutral-400 text-neutral-600 no-underline sm:ml-4"
						href="/blog"
					>
						Blog
					</MagicLink>
					<MagicLink
						className="dark:text-neutral-400 text-neutral-600 no-underline sm:ml-4"
						href="/photos"
					>
						Photos
					</MagicLink>
					<MagicLink
						className="dark:text-neutral-400 text-neutral-600 no-underline sm:ml-4"
						href="/contact"
					>
						Contact
					</MagicLink>
				</div>
			</div>
		</nav>
	);
}
