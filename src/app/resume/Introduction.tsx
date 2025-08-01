import Section from "../../components/Section";
import Highlight from "../../components/Highlight";

export default function Introduction() {
	return (
		<Section>
			<p className="text-lg leading-relaxed text-gray-900 dark:text-gray-200 mb-8">
				Phineas is a <Highlight>Senior Software Engineer</Highlight> with{" "}
				<Highlight>15+ years of experience</Highlight> in web development,
				specializing in building <Highlight>frontend</Highlight> solutions for{" "}
				<Highlight>web</Highlight>, <Highlight>mobile</Highlight> and{" "}
				<Highlight>TV</Highlight> platforms, who thrives in a team of high
				achievers who value continuous learning and mutual growth.
			</p>

			<div className="grid gap-6 mb-12 sm:px-8">
				<div className="flex gap-4">
					<div className="flex-none flex items-center justify-center w-12 h-12 rounded-lg bg-gray-300/50 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
							className="w-6 h-6"
						>
							<title>Code</title>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
							/>
						</svg>
					</div>
					<div>
						<h2 className="heading-3 text-gray-900 dark:text-gray-100 mb-1">
							Full-Stack Expertise
						</h2>
						<p className="text-gray-600 dark:text-gray-400 text-content-secondary">
							Deep experience across the{" "}
							<Highlight>entire web development stack</Highlight>, with
							particular strength in{" "}
							<Highlight>frontend architecture</Highlight> and{" "}
							<Highlight>modern frameworks</Highlight>.
						</p>
					</div>
				</div>

				<div className="flex gap-4">
					<div className="flex-none flex items-center justify-center w-12 h-12 rounded-lg bg-gray-300/50 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
							className="w-6 h-6"
						>
							<title>Product</title>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59"
							/>
						</svg>
					</div>
					<div>
						<h2 className="heading-3 text-gray-900 dark:text-gray-100 mb-1">
							Product-Focused Engineer
						</h2>
						<p className="text-gray-600 dark:text-gray-400 text-content-secondary">
							Proven track record of delivering complex web applications with a
							focus on user experience and business impact.
						</p>
					</div>
				</div>

				<div className="flex gap-4">
					<div className="flex-none flex items-center justify-center w-12 h-12 rounded-lg bg-gray-300/50 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
							className="w-6 h-6"
						>
							<title>Team</title>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
							/>
						</svg>
					</div>
					<div>
						<h3 className="heading-3 text-gray-900 dark:text-gray-100 mb-1">
							Team Leadership
						</h3>
						<p className="text-gray-600 dark:text-gray-400 text-content-secondary">
							Experienced in mentoring engineers, driving technical decisions,
							and fostering a culture of engineering excellence.
						</p>
					</div>
				</div>
			</div>
		</Section>
	);
}
