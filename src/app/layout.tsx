import BaseHead from "@/src/components/BaseHead";
import Footer from "@/src/components/Footer";
import Header from "@/src/components/Header";

import "./global.css";

export default function RootLayout({ children }: React.PropsWithChildren) {
	return (
		<html lang="en">
			<BaseHead />
			<body className="typography-body">
				<div className="min-h-screen flex flex-col transition-colors duration-300 dark:bg-gray-900 dark:text-gray-200">
					<a
						href="#main-content"
						className="sr-only focus:not-sr-only absolute top-0 left-0 w-full py-4 text-center"
					>
						Skip to content
					</a>
					<Header />
					<main id="main-content" tabIndex={-1} className="px-4 min-h-stretch">
						<div className="my-8">{children}</div>
					</main>
					<Footer />
				</div>
			</body>
		</html>
	);
}
