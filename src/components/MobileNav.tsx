"use client";

import type React from "react";
import { useEffect, useState } from "react";
import HeaderLink from "./HeaderLink"; // updated import for React

export default function MobileNav() {
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		if (isOpen) {
			document.body.classList.add("overflow-hidden");
		} else {
			document.body.classList.remove("overflow-hidden");
		}
	}, [isOpen]);

	const toggleNav = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div
			id="mobile-nav"
			className={`fixed inset-0 bg-white/90 dark:bg-black/90 backdrop-blur-md transition-all duration-300 ease-in-out z-50 sm:hidden flex flex-col ${isOpen ? "" : "translate-x-full"}`}
		>
			<div className="flex flex-col h-full">
				<div className="flex justify-end p-2 border-b border-gray-100 dark:border-gray-900 backdrop-blur-xs bg-white/80 dark:bg-black/80 sticky top-0">
					<button
						id="close-nav"
						type="button"
						aria-label="Close navigation menu"
						onClick={toggleNav}
						className="px-2 text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 active:bg-gray-100 dark:active:bg-gray-800/50 rounded-lg transition-colors"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
							className="w-6 h-6"
							aria-hidden="true"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>
				<nav className="flex flex-col items-stretch flex-1 gap-2 p-2">
					<HeaderLink
						href="#career"
						className="text-lg font-medium text-left py-3 px-4 rounded-lg transition-colors text-gray-600 dark:text-gray-400 hover:text-cyan-700 dark:hover:text-cyan-300 hover:bg-gray-50 dark:hover:bg-gray-900/50 active:bg-gray-100 dark:active:bg-gray-800/50"
						onClick={toggleNav}
					>
						<div className="flex items-center gap-3">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								className="w-5 h-5"
							>
								<title>Career Icon</title>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
								/>
							</svg>
							Career
						</div>
					</HeaderLink>
					<HeaderLink
						href="#skills"
						className="text-lg font-medium text-left py-3 px-4 rounded-lg transition-colors text-gray-600 dark:text-gray-400 hover:text-cyan-700 dark:hover:text-cyan-300 hover:bg-gray-50 dark:hover:bg-gray-900/50 active:bg-gray-100 dark:active:bg-gray-800/50"
						onClick={toggleNav}
					>
						<div className="flex items-center gap-3">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								className="w-5 h-5"
							>
								<title>Skills Icon</title>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"
								/>
							</svg>
							Skills
						</div>
					</HeaderLink>
					<HeaderLink
						href="#projects"
						className="text-lg font-medium text-left py-3 px-4 rounded-lg transition-colors text-gray-600 dark:text-gray-400 hover:text-cyan-700 dark:hover:text-cyan-300 hover:bg-gray-50 dark:hover:bg-gray-900/50 active:bg-gray-100 dark:active:bg-gray-800/50"
						onClick={toggleNav}
					>
						<div className="flex items-center gap-3">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								className="w-5 h-5"
							>
								<title>Projects Icon</title>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
								/>
							</svg>
							Projects
						</div>
					</HeaderLink>
				</nav>
			</div>
		</div>
	);
}
