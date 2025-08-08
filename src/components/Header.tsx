import DesignTokensHotkeys from "@/components/DesignTokensHotkeys";
import HeaderLink from "@/components/HeaderLink";

import ThemeToggle from "@/components/ThemeToggle";

const Header: React.FC = () => {
	return (
			<header className="border-b relative">
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
					<div
						className="hidden md:flex items-center gap-1 text-xs text-muted-foreground select-none"
						title="Hold Option (⌥) to enable design tweaks"
					>
						<span className="hidden sm:inline">Hold</span>
						<kbd className="rounded border px-1.5 py-0.5 text-[10px] leading-none">⌥</kbd>
						<span className="hidden sm:inline">for design tweaks</span>
					</div>
					<ThemeToggle />
				</div>
			</nav>
					<DesignTokensHotkeys />
		</header>
	);
};

export default Header;
