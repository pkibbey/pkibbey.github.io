"use client";

import { projectsData } from "../data/projectsData";

export default function ProjectSpotlight() {
	return (
		<section>
			<h2 className="section-title">Project Spotlight</h2>
			<p className="text-center text-gray-600 mb-12">
				Here are a few key projects that showcase my ability to lead
				development, solve complex problems, and deliver high-impact results,
				from large-scale rebrands to innovative event management platforms.
			</p>
			<div
				className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
				id="projects-container"
			>
				{projectsData.map((project) => (
					<div
						key={project.title}
						className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300"
					>
						<h3 className="text-xl font-bold text-gray-800">{project.title}</h3>
						<p className="mt-2 text-gray-600">{project.description}</p>
						<div className="mt-4 flex flex-wrap gap-2">
							{project.tags.map((tag) => (
								<span
									key={tag}
									className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full"
								>
									{tag}
								</span>
							))}
						</div>
					</div>
				))}
			</div>
			<style jsx>{`
        .section-title {
          font-size: 2.25rem;
          font-weight: 700;
          color: #f3f4f6; /* gray-100 */
          margin-bottom: 2rem;
          text-align: center;
        }
        .bg-white {
          background-color: #18181b !important;
        }
        .border-gray-200 {
          border-color: #23272e !important;
        }
        .text-gray-800,
        .text-gray-600 {
          color: #e5e7eb !important;
        }
        .text-blue-800 {
          color: #fbbf24 !important;
        }
        .bg-blue-100 {
          background-color: #23272e !important;
        }
      `}</style>
		</section>
	);
}
