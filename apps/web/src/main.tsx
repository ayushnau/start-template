import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { webStore, webPersistor } from "store";
import * as Sentry from "@sentry/react";

import "./i18n";

Sentry.init({
	dsn: process.env.VITE_SENTRY_DSN,
	environment: process.env.VITE_ENVIRONMENT,
	beforeSend(event) {
		if (event.environment === "development") return null;
		return event;
	},
	integrations: [
		new Sentry.Replay({
			maskAllText: false,
			blockAllMedia: false,
		}),
	],
	tracesSampleRate: 1.0,
	replaysSessionSampleRate: 0.1,
	replaysOnErrorSampleRate: 1.0,
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<BrowserRouter>
		<Provider store={webStore}>
			<PersistGate loading={null} persistor={webPersistor}>
				<React.Suspense fallback="loading">
					<Sentry.ErrorBoundary>
						<App />
					</Sentry.ErrorBoundary>
				</React.Suspense>
			</PersistGate>
		</Provider>
	</BrowserRouter>,
);
