import LogRocket from 'logrocket'
import setupLogRocketReact from 'logrocket-react'
import * as Sentry from '@sentry/gatsby'

const environment = process.env.NODE_ENV
const release = process.env.GATSBY_RELEASE_VERSION

if (environment === 'production') {
  LogRocket.init('u8t5r0/damianmullinscom')

  setupLogRocketReact(LogRocket)

  Sentry.init({
    dsn: 'https://xFG59rFyabkNnXQ9RKc4GhqC@s1733957.eu-fsn-3.betterstackdata.com/1733957',
    environment,
    release: `damianmullins@${release}`,

    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,

    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        maskAllText: true,
        blockAllMedia: true
      })
    ],

    // Performance optimization: Reduce traces sample rate to 0.1 (10%) in production
    // to reduce overhead and network traffic while still providing enough data
    // for performance monitoring.
    tracesSampleRate: 0.1,
    enableLogs: false,

    beforeSend(event) {
      const logRocketSession = LogRocket.sessionURL

      if (logRocketSession !== null) {
        event.extra['LogRocket'] = logRocketSession
        return event
      } else {
        return event
      }
    }
  })

  LogRocket.getSessionURL(sessionURL =>
    Sentry.getCurrentScope().setExtra('sessionURL', sessionURL)
  )
}
