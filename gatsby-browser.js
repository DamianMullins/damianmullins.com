
import LogRocket from 'logrocket';
import setupLogRocketReact from 'logrocket-react';
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

const environment = process.env.NODE_ENV;
const release = process.env.GATSBY_RELEASE_VERSION;

if (environment === 'production') {
  LogRocket.init('u8t5r0/damianmullinscom');

  setupLogRocketReact(LogRocket);

  Sentry.init({
    dsn: "https://b7ebba6ca5dd4d65a2ee0ea7f7665a22@o43921.ingest.sentry.io/1197101",
    environment,
    release,

    integrations: [
      new Sentry.Integrations.UserAgent(),
      new Integrations.BrowserTracing(),
    ],

    tracesSampleRate: 1.0
  });

  LogRocket.getSessionURL(sessionURL => {
    Sentry.configureScope(scope => {
      scope.setExtra("sessionURL", sessionURL);
    });
  });
}
