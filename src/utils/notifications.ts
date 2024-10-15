import { Notify } from 'quasar';
import { AxiosError } from 'axios';

export function showError(message: string) {
  Notify.create({
    type: 'negative',
    message,
  });
}

export function showSuccess(message: string) {
  Notify.create({
    type: 'positive',
    message,
  });
}

export function handleApiError(error: unknown, defaultMessage: string) {
  if (error instanceof AxiosError) {
    showError(error.message);
  } else {
    showError(defaultMessage);
  }
}
