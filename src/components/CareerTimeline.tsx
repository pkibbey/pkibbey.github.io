"use client";

import { useState } from "react";
import { timelineData } from "../app/data/timelineData";

export default function CareerTimeline() {
	const [activeIndex, setActiveIndex] = useState(0);

	return (
		<section id="career" className="container max-w-2xl mx-auto">
			<h2 className="typography-heading-3 mb-8 text-center">Career Journey</h2>
			<p className="typography-body mb-8">
				My career is a story of continuous adaptation and learning, from
				co-founding one of the UK's first social networks to architecting
				solutions for modern smart homes.
			</p>
			<div className="max-w-2xl mx-auto grid gap-8">
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
							<h3 className="typography-heading-5">{item.role}</h3>
							<p>{item.company}</p>
							<p className="typography-small">{item.period}</p>
						</div>
						<div className="mt-4">
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
