"use client";

import type React from "react";
import { useEffect, useState } from "react";

const ScrollDate: React.FC = () => {
	const [currentDate, setCurrentDate] = useState("Present");

	useEffect(() => {
		const handleScroll = () => {
			const workItems = document.querySelectorAll('[id^="work-"]');
			const viewportHeight = window.innerHeight;
			let closestItem: Element | null = null;
			let closestDistance = Number.POSITIVE_INFINITY;

			for (const item of workItems) {
				const rect = item.getBoundingClientRect();
				const distance = Math.abs(rect.top - viewportHeight / 3);

				if (distance < closestDistance) {
					closestDistance = distance;
					closestItem = item;
				}
			}

			if (closestItem) {
				const start = closestItem.querySelector(".text-gray-500")?.textContent;
				if (start) {
					// Get the start year
					const year = start.split(" - ")[1].split(" ")[1];
					setCurrentDate(year);
				}
			}
		};

		window.addEventListener("scroll", handleScroll);
		handleScroll(); // Initial call

		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<div className="heading-4 text-right text-gray-900 dark:text-gray-100">
			({currentDate})
		</div>
	);
};

export default ScrollDate;
