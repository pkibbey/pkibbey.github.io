"use client";

import React, { useState } from "react";
import { timelineData } from "../data/timelineData";

export default function CareerTimeline() {
	const [activeIndex, setActiveIndex] = useState(0);

	return (
		<section>
			<h2 className="section-title">Career Journey</h2>
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
								<p className="text-md font-medium text-gray-600">
									{item.company}
								</p>
								<p className="text-sm text-gray-500">{item.period}</p>
							</div>
							<div
								className={`details mt-4 overflow-hidden transition-max-height duration-500 ease-in-out ${
									activeIndex === idx ? "" : "max-h-0"
								}`}
								style={
									activeIndex === idx ? { maxHeight: 2000 } : { maxHeight: 0 }
								}
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
			<style jsx>{`
        .timeline-item::before {
          content: "";
          position: absolute;
          left: -2.75rem;
          top: 0;
          width: 1.5rem;
          height: 1.5rem;
          border-radius: 50%;
          background-color: #23272e; /* darker neutral for dark bg */
          border: 4px solid #18181b; /* match dark bg */
        }
        .timeline-item.active::before {
          background-color: #fbbf24; /* amber-400 for highlight */
        }
        .section-title {
          font-size: 2.25rem;
          font-weight: 700;
          color: #f3f4f6; /* gray-100 */
          margin-bottom: 2rem;
          text-align: center;
        }
        /* Override text colors for dark mode */
        .text-gray-800,
        .text-gray-600,
        .text-gray-500 {
          color: #e5e7eb !important; /* gray-200 */
        }
        .text-md.font-medium.text-gray-600 {
          color: #fbbf24 !important; /* accent for company */
        }
        .border-gray-200 {
          border-color: #23272e !important;
        }
        .bg-white {
          background-color: #18181b !important;
        }
      `}</style>
		</section>
	);
}
