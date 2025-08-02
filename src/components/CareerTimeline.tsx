"use client";

import { useState } from "react";
import { timelineData } from "../app/data/timelineData";

export default function CareerTimeline() {
	const [activeIndex, setActiveIndex] = useState(0);

	return (
		<section>
			<h2 className="text-3xl font-bold text-gray-100 mb-8 text-center">
				Career Journey
			</h2>
			<p className="text-center text-gray-600 mb-12">
				My career is a story of continuous adaptation and learning, from
				co-founding one of the UK's first social networks to architecting
				solutions for modern smart homes.
			</p>
			<div className="max-w-4xl mx-auto">
				<div className="relative pl-12" id="timeline-container">
					{timelineData.map((item, idx) => (
						<div
							key={item.role + item.company}
							className={`timeline-item relative mb-8 pl-4 transition-all duration-300 ease-in-out ${
								activeIndex === idx ? "active" : ""
							}`}
						>
							<div
								className="cursor-pointer"
								onClick={() => setActiveIndex(idx === activeIndex ? -1 : idx)}
							>
								<h3 className="text-lg font-bold text-gray-800">{item.role}</h3>
								<p className="text-md font-medium text-amber-400">
									{item.company}
								</p>
								<p className="text-sm text-gray-500">{item.period}</p>
							</div>
							<div
								className={`details mt-4 overflow-hidden transition-max-height duration-500 ease-in-out`}
							>
								<ul className="list-disc list-inside space-y-2 text-gray-600">
									{item.details.map((detail) => (
										<li key={detail}>{detail}</li>
									))}
								</ul>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
