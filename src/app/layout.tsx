import BaseHead from "@/src/components/BaseHead";
import Footer from "@/src/components/Footer";
import Header from "@/src/components/Header";

import "./global.css";

export default function RootLayout({ children }: React.PropsWithChildren) {
	return (
		<html lang="en">
			<BaseHead />
			<body className="dark bg-[#040508]">
				<div className="min-h-screen flex flex-col bg-gray-200 dark:bg-gray-900 text-gray-950 dark:text-gray-50 transition-colors duration-300">
					<a
						href="#main-content"
						className="sr-only focus:not-sr-only absolute top-0 left-0 w-full py-4 text-center text-white bg-cyan-500"
					>
						Skip to content
					</a>
					<Header />
					<main
						id="main-content"
						tabIndex={-1}
						className="container max-w-4xl mx-auto prose-lg px-4 min-h-stretch"
					>
						<div className="my-8">{children}</div>
					</main>
					<Footer />
				</div>
			</body>
		</html>
	);
}
