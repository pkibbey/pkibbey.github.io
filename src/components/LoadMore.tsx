"use client";

import type React from "react";
import { useEffect } from "react";

interface Props {
	initialPosts: number;
	totalPosts: number;
	type?: "posts" | "experiences";
}

const LoadMore: React.FC<Props> = ({
	initialPosts,
	totalPosts,
	type = "posts",
}) => {
	useEffect(() => {
		let currentlyShown = initialPosts;
		const button = document.getElementById("load-more-button");
		const handleClick = () => {
			const items = document.querySelectorAll(
				type === "experiences" ? ".experience-item" : ".post-item",
			);
			const separators = document.querySelectorAll(".experience-separator");
			const hiddenItems = Array.from(items).slice(currentlyShown);
			const batchSize = type === "experiences" ? 2 : 6;
			for (let i = 0; i < batchSize && i < hiddenItems.length; i++) {
				hiddenItems[i].classList.remove("hidden");
				if (type === "experiences" && separators[currentlyShown + i - 1]) {
					separators[currentlyShown + i - 1].classList.remove("hidden");
				}
			}
			currentlyShown += batchSize;
			if (currentlyShown >= totalPosts) {
				button?.remove();
			}
		};
		button?.addEventListener("click", handleClick);
		return () => {
			button?.removeEventListener("click", handleClick);
		};
	}, [initialPosts, totalPosts, type]);

	return (
		<div className="flex justify-center mt-8" id="load-more-container">
			{totalPosts > initialPosts && (
				<button
					id="load-more-button"
					type="button"
					className="px-6 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200 text-gray-900 dark:text-gray-100"
				>
					Load More {type === "experiences" ? "Experience" : "Posts"}
				</button>
			)}
		</div>
	);
};

export default LoadMore;
