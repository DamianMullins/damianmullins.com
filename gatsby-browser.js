import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

Sentry.init({
    dsn: "https://b7ebba6ca5dd4d65a2ee0ea7f7665a22@o43921.ingest.sentry.io/1197101",
    integrations: [
        new Integrations.BrowserTracing(),
    ],

    tracesSampleRate: 1.0
});
