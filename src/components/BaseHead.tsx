export default function BaseHead() {
	return (
		<>
			{/* Global Metadata */}
			<meta charSet="utf-8" />
			<meta name="viewport" content="width=device-width,initial-scale=1" />
			<link rel="icon" type="image/svg+xml" href="/logo.svg" />
			{/* Set a default generator - adjust as needed */}
			{/* SEO */}
			<title>Phineas Kibbey - Personal Website</title>
			<meta
				name="description"
				content="Welcome to the personal website of Phineas Kibbey. Learn more about my projects, skills, and experience."
			/>

			{/* Cache-Control Meta Tag */}
			<meta httpEquiv="Cache-Control" content="max-age=3600, public" />

			{/* Font preloads */}
			<link
				rel="preload"
				href="/fonts/inter/Inter-Regular.woff2"
				as="font"
				type="font/woff2"
				crossOrigin="anonymous"
			/>
			<link
				rel="preload"
				href="/fonts/inter/Inter-Medium.woff2"
				as="font"
				type="font/woff2"
				crossOrigin="anonymous"
			/>
			<link
				rel="preload"
				href="/fonts/inter/Inter-SemiBold.woff2"
				as="font"
				type="font/woff2"
				crossOrigin="anonymous"
			/>
			<link
				rel="preload"
				href="/fonts/inter/Inter-Bold.woff2"
				as="font"
				type="font/woff2"
				crossOrigin="anonymous"
			/>
		</>
	);
}