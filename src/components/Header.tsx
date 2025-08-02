import type React from "react";
import HeaderLink from "./HeaderLink";
import SocialLinks from "./SocialLinks";

const Header: React.FC = () => {
	return (
		<header className="backdrop-blur-xs border-b">
			<nav className="container max-w-4xl mx-auto px-4 flex items-center justify-between gap-8">
				<div className="flex items-center gap-6">
					<h1 className="text-2xl font-bold">PK</h1>
					<div className="hidden sm:flex items-center sm:gap-2 md:gap-4">
						<HeaderLink href="#career">Career</HeaderLink>
						<HeaderLink href="#skills">Skills</HeaderLink>
						<HeaderLink href="#projects">Projects</HeaderLink>
					</div>
				</div>
				<SocialLinks />
			</nav>
		</header>
	);
};

export default Header;
