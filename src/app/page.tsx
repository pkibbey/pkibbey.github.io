import Link from "next/link";
import Highlight from "../components/Highlight";

export default function Page() {
	return (
		<div className="max-w-4xl mx-auto">
			<section className="mb-12 md:mb-24 text-content">
				<div className="max-w-4xl">
					<p className="text-gray-900 dark:text-gray-200 mb-6 whitespace-pre-wrap">
						I specialize in creating modern web applications using{" "}
						<Highlight>React</Highlight>, <Highlight>TypeScript</Highlight>, and{" "}
						<Highlight>Node.js</Highlight>.
					</p>
				</div>
			</section>
		</div>
	);
}
