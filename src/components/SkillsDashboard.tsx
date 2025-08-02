"use client";

import {
	Chart as ChartJS,
	Filler,
	Legend,
	LineElement,
	PointElement,
	RadialLinearScale,
	Tooltip,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import { skillsData } from "../app/data/skillsData";

ChartJS.register(
	RadialLinearScale,
	PointElement,
	LineElement,
	Filler,
	Tooltip,
	Legend,
);

const chartData = {
	labels: [
		"Frontend",
		"Backend",
		"Leadership",
		"Architecture",
		"Testing",
		"Design",
	],
	datasets: [
		{
			label: "Area of Expertise",
			data: [9, 7, 8, 9, 8, 7],
		},
	],
};

const chartOptions = {
	maintainAspectRatio: false,
	scales: {
		r: {
			pointLabels: {
				font: { size: 12 },
			},
			ticks: {
				backdropColor: "transparent",
				stepSize: 2,
			},
			min: 0,
			max: 10,
		},
	},
	plugins: {
		legend: {
			display: false,
		},
		tooltip: {
			borderWidth: 1,
		},
	},
};

export default function SkillsDashboard() {
	return (
		<section id="skills">
			<h2 className="text-[2.25rem] font-bold mb-8 text-center">
				Skills Dashboard
			</h2>
			<p className="text-center mb-12">
				My technical expertise spans the full stack, with a deep focus on
				creating modern, robust, and maintainable front-end systems. This
				dashboard provides a visual overview of my core competencies.
			</p>
			<div className="grid md:grid-cols-2 gap-8 items-center">
				<div className="relative w-full max-w-[400px] mx-auto h-[300px] max-h-[350px] rounded-xl min-h-[300px] md:h-[400px]">
					<Radar data={chartData} options={chartOptions} />
				</div>
				<div>
					<h3 className="text-xl font-bold mb-4">Core Competencies</h3>
					<div className="flex flex-wrap gap-3">
						{Object.entries(skillsData).map(([category, skills]) =>
							skills.map((skill) => (
								<span
									key={category + skill}
									className="text-sm font-medium px-3 py-1 rounded-full"
								>
									{skill}
								</span>
							)),
						)}
					</div>
				</div>
			</div>
		</section>
	);
}
