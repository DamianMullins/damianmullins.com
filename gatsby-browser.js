import LogRocket from 'logrocket'
import setupLogRocketReact from 'logrocket-react'
import * as Sentry from '@sentry/gatsby'

const environment = process.env.NODE_ENV
const release = process.env.GATSBY_RELEASE_VERSION

if (environment === 'production') {
  LogRocket.init('u8t5r0/damianmullinscom')

  setupLogRocketReact(LogRocket)

  Sentry.init({
    dsn: 'https://b7ebba6ca5dd4d65a2ee0ea7f7665a22@o43921.ingest.sentry.io/1197101',
    environment,
    release: `damianmullins@${release}`,

    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,

    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        maskAllText: false,
        blockAllMedia: false
      })
    ],

    tracesSampleRate: 1.0,
    enableLogs: true,

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

  Sentry.logger.info('User triggered test log', { log_source: 'sentry_test' })

  LogRocket.getSessionURL(sessionURL =>
    Sentry.getCurrentScope().setExtra('sessionURL', sessionURL)
  )
}
