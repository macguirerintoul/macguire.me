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
		<nav className="fixed left-0 right-0 top-4 z-10 mx-auto flex h-12 w-[calc(var(--max-content-width)+32px)] items-center justify-between overflow-hidden rounded-full border border-neutral-200 bg-neutral-50   px-4 dark:border-neutral-700">
			<div className="backdrop"></div>
			<MagicLink
				className="relative text-neutral-600 no-underline dark:text-neutral-100"
				href="/"
			>
				<span onClick={closeMobileMenu}>Macguire Rintoul</span>
			</MagicLink>

			<button className="sm:hidden" onClick={toggleMobileMenu}>
				{showMobileMenu ? "Close" : "Menu"}
			</button>

			<div
				className={`relative flex w-full flex-col sm:mt-0 sm:block sm:w-auto ${
					showMobileMenu ? "block" : "hidden"
				}`}
				onClick={closeMobileMenu}
			>
				<MagicLink
					className="text-neutral-600 no-underline dark:text-neutral-100"
					href="/"
				>
					Home
				</MagicLink>
				<MagicLink
					className="text-neutral-600 no-underline sm:ml-4 dark:text-neutral-100"
					href="/about"
				>
					About
				</MagicLink>
				<MagicLink
					className="text-neutral-600 no-underline sm:ml-4 dark:text-neutral-100"
					href="/blog"
				>
					Blog
				</MagicLink>
				<MagicLink
					className="text-neutral-600 no-underline sm:ml-4 dark:text-neutral-100"
					href="/photos"
				>
					Photos
				</MagicLink>
				<MagicLink
					className="text-neutral-600 no-underline sm:ml-4 dark:text-neutral-100"
					href="/links"
				>
					Links
				</MagicLink>
				<MagicLink
					className="text-neutral-600 no-underline sm:ml-4 dark:text-neutral-100"
					href="/contact"
				>
					Contact
				</MagicLink>
			</div>
		</nav>
	);
}
