// Basic logger setup, ready for Sentry/Datadog integration
export const logger = {
  info: (message: string, ...args: any[]) => {
    if (__DEV__) {
      console.log(`[INFO] ${message}`, ...args);
    }
    // TODO: Send to remote logging service like Sentry or Datadog
  },
  warn: (message: string, ...args: any[]) => {
    if (__DEV__) {
      console.warn(`[WARN] ${message}`, ...args);
    }
  },
  error: (message: string, error?: Error, ...args: any[]) => {
    if (__DEV__) {
      console.error(`[ERROR] ${message}`, error, ...args);
    }
    // TODO: Send crash report
  },
  debug: (message: string, ...args: any[]) => {
    if (__DEV__) {
      console.debug(`[DEBUG] ${message}`, ...args);
    }
  }
};
