"use client";

import { useState } from "react";
import { timelineData } from "../app/data/timelineData";

export default function CareerTimeline() {
	const [activeIndex, setActiveIndex] = useState(0);

	return (
		<section id="career">
			<h2 className="typography-heading-2 mb-8 text-center">Career Journey</h2>
			<p className="typography-body text-center mb-12">
				My career is a story of continuous adaptation and learning, from
				co-founding one of the UK's first social networks to architecting
				solutions for modern smart homes.
			</p>
			<div className="max-w-4xl mx-auto grid gap-8">
				{timelineData.map((item, idx) => (
					<div
						key={item.role + item.company}
						className={`timeline-item relative transition-all duration-300 ease-in-out ${
							activeIndex === idx ? "active" : ""
						}`}
					>
						<div
							className="cursor-pointer"
							onClick={() => setActiveIndex(idx === activeIndex ? -1 : idx)}
						>
							<h3 className="typography-heading-3 text-lg font-bold">
								{item.role}
							</h3>
							<p className="text-md font-medium">{item.company}</p>
							<p className="text-sm">{item.period}</p>
						</div>
						<div className={`details mt-4`}>
							<ul className="list-disc list-inside space-y-2">
								{item.details.map((detail) => (
									<li key={detail}>{detail}</li>
								))}
							</ul>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
