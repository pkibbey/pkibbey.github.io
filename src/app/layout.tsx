import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "./global.css";


export const metadata: Metadata = {
	title: "Phineas Kibbey",
	description:
		"Portfolio and resume of Phineas Kibbey: projects, case studies, skills, and experience in product design and front-end engineering.",
	icons: [{ rel: "icon", url: '/favicon.svg' }],
};

export default function RootLayout({ children }: React.PropsWithChildren) {
	return (
		<html lang="en">
			<body className="typography-body">
				<div className="min-h-screen flex flex-col transition-colors duration-300 bg-background text-foreground">
					<Header />
					<main className="my-8">
						{children}
					</main>
					<Footer />
				</div>
			</body>
		</html>
	);
}
