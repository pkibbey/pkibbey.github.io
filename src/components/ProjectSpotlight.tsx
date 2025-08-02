"use client";

import { projectsData } from "../app/data/projectsData";

export default function ProjectSpotlight() {
	return (
		<section id="projects">
			<h2 className="text-3xl font-bold mb-8 text-center">Project Spotlight</h2>
			<p className="text-center mb-12">
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
						className="p-6 rounded-lg border shadow-sm hover:shadow-lg transition-shadow duration-300"
					>
						<h3 className="text-xl font-bold">{project.title}</h3>
						<p className="mt-2">{project.description}</p>
						<div className="mt-4 flex flex-wrap gap-2">
							{project.tags.map((tag) => (
								<span
									key={tag}
									className="text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full"
								>
									{tag}
								</span>
							))}
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
