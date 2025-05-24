import * as Sentry from "@sentry/remix";

Sentry.init({
  dsn: "https://eb3464d5364477c238635a931a88a34f@o4507948895174656.ingest.us.sentry.io/4509376873431040",
  tracesSampleRate: 1,
});
