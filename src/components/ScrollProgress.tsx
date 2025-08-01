"use client";

import type React from "react";
import { useEffect, useRef } from "react";

const ScrollProgress: React.FC = () => {
	const progressBarRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const progressBar = progressBarRef.current;
		if (!progressBar) return;

		const updateProgress = () => {
			const windowHeight = window.innerHeight;
			const documentHeight = document.documentElement.scrollHeight;
			const scrollTop = window.scrollY;

			if (documentHeight <= windowHeight) {
				progressBar.style.transform = "scaleX(0)";
				return;
			}

			const scrollPercent = scrollTop / (documentHeight - windowHeight);
			progressBar.style.transform = `scaleX(${scrollPercent})`;
		};

		window.addEventListener("scroll", updateProgress);
		window.addEventListener("resize", updateProgress);
		updateProgress();

		return () => {
			window.removeEventListener("scroll", updateProgress);
			window.removeEventListener("resize", updateProgress);
		};
	}, []);

	return (
		<div className="fixed top-0 left-0 right-0 h-0.5 z-50">
			<div
				ref={progressBarRef}
				className="h-full bg-linear-to-r from-blue-500 to-purple-500 transform origin-left scale-x-0 transition-transform duration-100"
			/>
		</div>
	);
};

export default ScrollProgress;
