import { ViteReactSSG } from "vite-react-ssg/single-page";
import RootLayout from "./app/layout";
import "./index.css";
import App from "./App";

export const createRoot = ViteReactSSG(
	<RootLayout>
		<App />
	</RootLayout>
);
