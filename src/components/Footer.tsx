import type React from "react";
import HeaderLink from "./HeaderLink";
import SocialLinks from "./SocialLinks";

const Footer: React.FC = () => {
	return (
		<footer className="border-t">
			<nav className="container max-w-5xl mx-auto px-4 flex items-center justify-between gap-8">
				<div className="flex items-center gap-6">
					<a href="/">
						<h1 className="typography-heading-4">PK</h1>
					</a>
					<div className="hidden sm:flex items-center sm:gap-2 md:gap-4">
						<HeaderLink href="#career">Career</HeaderLink>
						<HeaderLink href="#skills">Skills</HeaderLink>
						<HeaderLink href="#projects">Projects</HeaderLink>
					</div>
				</div>
				<div className="flex items-center gap-4">
					<SocialLinks />
				</div>
			</nav>
		</footer>
	);
};

export default Footer;
