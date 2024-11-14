"use client";
import { Command } from "cmdk";
import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";
const Cmdk = () => {
	const [open, setOpen] = useState(false);
	const router = useRouter();

	// Toggle the menu when ⌘K is pressed
	useEffect(() => {
		const down = (e) => {
			if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen((open) => !open);
			}
		};

		document.addEventListener("keydown", down);
		return () => document.removeEventListener("keydown", down);
	}, []);

	const goTo = (path: string) => {
		router.push(`/${path.toLowerCase()}`);
		setOpen(false);
	};

	return (
		<Command.Dialog
			className="cmdk fixed left-1/2 top-1/2 w-96 -translate-x-1/2 -translate-y-2/3 rounded-lg bg-neutral-50 p-2 transition-all duration-100 dark:bg-neutral-900"
			open={open}
			onOpenChange={setOpen}
			label="Global Command Menu"
		>
			<Command.Input placeholder="Search..." />
			<Command.List>
				<Command.Empty>No results found.</Command.Empty>
				<Command.Item onSelect={(value) => goTo("/")}>Home</Command.Item>
				<Command.Item onSelect={(value) => goTo(value)}>About</Command.Item>
				<Command.Item onSelect={(value) => goTo(value)}>Photos</Command.Item>
				<Command.Item onSelect={(value) => goTo(value)}>Contact</Command.Item>
			</Command.List>
		</Command.Dialog>
	);
};
export { Cmdk };
