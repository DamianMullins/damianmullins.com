// LogRocket initialization for production
// This runs client-side and integrates with Sentry
if (import.meta.env.PROD) {
  import('logrocket').then(({ default: LogRocket }) => {
    LogRocket.init('u8t5r0/damianmullinscom')

    // Store session URL on window for Sentry's beforeSend hook
    LogRocket.getSessionURL(sessionURL => {
      ;(window as unknown as Record<string, unknown>).__LOGROCKET_SESSION_URL =
        sessionURL
    })
  })
}
