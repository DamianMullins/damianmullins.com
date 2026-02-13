## 2025-01-29 - [Optimized Sentry Traces Sample Rate]

**Learning:** In production environments, a 100% Sentry traces sample rate (tracesSampleRate: 1.0) can introduce significant network and CPU overhead. Reducing it to a lower value (e.g., 0.1) provides sufficient data for performance monitoring while improving client-side efficiency.
**Action:** Always check the Sentry configuration for sampling rates in production blocks to avoid unnecessary telemetry overhead.
