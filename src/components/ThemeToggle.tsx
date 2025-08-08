"use client"

import { useEffect, useState } from "react";

const getSystemTheme = () => {
	if (typeof window === "undefined") return "light";
	return window.matchMedia("(prefers-color-scheme: dark)").matches
		? "dark"
		: "light";
};

const ThemeToggle: React.FC = () => {
	const [theme, setTheme] = useState<string>("light");
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
		const stored = localStorage.getItem("theme");
		setTheme(stored || getSystemTheme());
	}, []);

	useEffect(() => {
		if (!mounted) return;
		if (theme === "dark") {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
		localStorage.setItem("theme", theme);
	}, [theme, mounted]);

	useEffect(() => {
		if (!mounted) return;
		const media = window.matchMedia("(prefers-color-scheme: dark)");
		const handleChange = () => {
			if (!localStorage.getItem("theme")) {
				setTheme(getSystemTheme());
			}
		};
		media.addEventListener("change", handleChange);
		return () => media.removeEventListener("change", handleChange);
	}, [mounted]);

	const toggleTheme = () => {
		setTheme((prev) => (prev === "dark" ? "light" : "dark"));
	};

	if (!mounted) return null;

	return (
		<button
			type="button"
			aria-label="Toggle theme"
			onClick={toggleTheme}
			className="rounded p-2 transition-colors duration-200 hover:bg-gray-200 dark:hover:bg-gray-700"
			title="Toggle light/dark mode"
		>
			{theme === "dark" ? (
				<svg
					width="20"
					height="20"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<title>Switch to light mode</title>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.95l-.71.71M21 12h-1M4 12H3m16.66 5.66l-.71-.71M4.05 4.05l-.71-.71M12 5a7 7 0 100 14 7 7 0 000-14z"
					/>
				</svg>
			) : (
				<svg
					width="20"
					height="20"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<title>Switch to dark mode</title>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
					/>
				</svg>
			)}
		</button>
	);
};

export default ThemeToggle;
