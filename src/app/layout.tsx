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
		<html lang="en" suppressHydrationWarning>
			<head>
				{/* Pre-hydration theme init to avoid white flash */}
				<script>{`(()=>{try{var d=document.documentElement;var s=localStorage.getItem('theme');var m=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches;var dark=s? s==='dark': m;dark?d.classList.add('dark'):d.classList.remove('dark');d.style.colorScheme=dark?'dark':'light';}catch(e){}})();`}</script>
			</head>
			<body className="typography-body">
				<div className="min-h-screen flex flex-col">
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
