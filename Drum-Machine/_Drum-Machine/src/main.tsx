import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import initializeTestSuiteObserver from "./utils/test-suite-observer";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");
initializeTestSuiteObserver();

createRoot(rootElement).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
