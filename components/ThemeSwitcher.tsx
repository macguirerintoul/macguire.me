import { useTheme } from "next-themes";

const ThemeSwitcher = () => {
	const { theme, setTheme } = useTheme();

	function toggleTheme() {
		theme === "dark" ? setTheme("light") : setTheme("dark");
	}

	return (
		<span className="theme" onClick={() => toggleTheme()}>
			{theme === "dark" ? "☼" : "☽"}
		</span>
	);
};

export default ThemeSwitcher;
