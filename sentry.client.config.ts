import * as Sentry from '@sentry/browser'

const release = `damianmullins@${import.meta.env.PUBLIC_RELEASE_VERSION ?? ''}`

Sentry.init({
  dsn: 'https://xFG59rFyabkNnXQ9RKc4GhqC@s1733957.eu-fsn-3.betterstackdata.com/1733957',
  environment: import.meta.env.MODE,
  release,

  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,

  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration({
      maskAllText: true,
      blockAllMedia: true
    })
  ],

  tracesSampleRate: 0.1,

  beforeSend(event) {
    // Attach LogRocket session URL if available
    if (
      typeof window !== 'undefined' &&
      (window as unknown as Record<string, unknown>).__LOGROCKET_SESSION_URL
    ) {
      event.extra = event.extra || {}
      event.extra['LogRocket'] = (
        window as unknown as Record<string, unknown>
      ).__LOGROCKET_SESSION_URL
    }
    return event
  }
})
