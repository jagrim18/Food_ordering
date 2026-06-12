import { Alert } from 'react-native';
import { logger } from './logger';

export class ErrorHandler {
  static init() {
    // Global Error Boundary setup could be integrated here with something like react-native-error-boundary
    // For now, we will handle uncaught errors
    const defaultErrorHandler = ErrorUtils.getGlobalHandler();
    
    ErrorUtils.setGlobalHandler((error, isFatal) => {
      logger.error('Uncaught Exception', error as Error);
      
      if (isFatal) {
        Alert.alert(
          'Unexpected Error',
          'A fatal error occurred. We have logged the issue and are working on it. The app may need to restart.',
          [
            { text: 'OK', onPress: () => { /* Restart logic or exit */ } }
          ]
        );
      } else {
        defaultErrorHandler(error, isFatal);
      }
    });
  }

  static handleApiError(error: any) {
    logger.error('API Error', error);
    // Generic API error handling (could trigger toast/snackbar)
    const message = error?.response?.data?.message || error.message || 'An unexpected API error occurred.';
    Alert.alert('Network Error', message);
  }

  static retryMechanism<T>(fn: () => Promise<T>, retries = 3, delay = 1000): Promise<T> {
    return new Promise((resolve, reject) => {
      const attempt = (n: number) => {
        fn()
          .then(resolve)
          .catch((err) => {
            if (n === 1) {
              reject(err);
            } else {
              setTimeout(() => attempt(n - 1), delay);
            }
          });
      };
      attempt(retries);
    });
  }
}
