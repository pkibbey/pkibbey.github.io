"use client";

import React from "react";
import { skillsData } from "../data/skillsData";
import { Radar } from "react-chartjs-2";
import {
	Chart as ChartJS,
	RadialLinearScale,
	PointElement,
	LineElement,
	Filler,
	Tooltip,
	Legend,
} from "chart.js";

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
			backgroundColor: "rgba(74, 85, 104, 0.2)",
			borderColor: "rgba(45, 55, 72, 1)",
			pointBackgroundColor: "rgba(45, 55, 72, 1)",
			pointBorderColor: "#fff",
			pointHoverBackgroundColor: "#fff",
			pointHoverBorderColor: "rgba(45, 55, 72, 1)",
		},
	],
};

const chartOptions = {
	maintainAspectRatio: false,
	scales: {
		r: {
			angleLines: { color: "rgba(243, 244, 246, 0.2)" }, // gray-100
			grid: { color: "rgba(243, 244, 246, 0.15)" },
			pointLabels: {
				font: { size: 14 },
				color: "#f3f4f6", // gray-100
			},
			ticks: {
				color: "#fbbf24", // amber-400
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
			labels: {
				color: "#f3f4f6", // gray-100
			},
		},
		tooltip: {
			backgroundColor: "#23272e",
			titleColor: "#fbbf24",
			bodyColor: "#f3f4f6",
			borderColor: "#fbbf24",
			borderWidth: 1,
		},
	},
};

export default function SkillsDashboard() {
	return (
		<section>
			<h2 className="text-[2.25rem] font-bold text-gray-100 mb-8 text-center">
				Skills Dashboard
			</h2>
			<p className="text-center text-gray-300 mb-12">
				My technical expertise spans the full stack, with a deep focus on
				creating modern, robust, and maintainable front-end systems. This
				dashboard provides a visual overview of my core competencies.
			</p>
			<div className="grid md:grid-cols-2 gap-8 items-center">
				<div className="relative w-full max-w-[500px] mx-auto h-[350px] max-h-[400px] bg-zinc-900 rounded-xl min-h-[350px] md:h-[400px]">
					<Radar data={chartData} options={chartOptions} />
				</div>
				<div>
					<h3 className="text-xl font-bold text-amber-400 mb-4">
						Core Competencies
					</h3>
					<div className="flex flex-wrap gap-3">
						{Object.entries(skillsData).map(([category, skills]) =>
							skills.map((skill) => (
								<span
									key={category + skill}
									className="bg-zinc-800 text-sm font-medium px-3 py-1 rounded-full"
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
