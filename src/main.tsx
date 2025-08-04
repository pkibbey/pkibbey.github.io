import React from "react";
import ReactDOM from "react-dom/client";
import RootLayout from "./app/layout";
import "./index.css";
import App from "./App";

const rootElement = document.getElementById("root");
if (rootElement) {
	ReactDOM.createRoot(rootElement).render(
		<React.StrictMode>
			<RootLayout>
				<App />
			</RootLayout>
		</React.StrictMode>,
	);
}
