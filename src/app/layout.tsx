import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "./global.css";

export const metadata: Metadata = {
	title: "Phineas Kibbey - Personal Website",
	description:
		"Welcome to the personal website of Phineas Kibbey. Learn more about my projects, skills, and experience.",
	icons: [{ rel: "icon", url: "/logo.svg" }],
};

export default function RootLayout({ children }: React.PropsWithChildren) {
	return (
		<html lang="en">
			<body className="typography-body">
				<div className="min-h-screen flex flex-col transition-colors duration-300 bg-background text-foreground">
					<Header />
					<main id="main-content" tabIndex={-1} className="min-h-stretch">
						<div className="my-8">{children}</div>
					</main>
					<Footer />
				</div>
			</body>
		</html>
	);
}
