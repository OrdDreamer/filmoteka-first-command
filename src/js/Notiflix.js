import { Notify } from 'notiflix';

export class Notiflix {

  showSuccess(message) {
    return Notify.success(message);
  }
  showInfo(message) {
    return Notify.info(message);
  }

  showWarning(message) {
    return Notify.warning(message);
  }

  showFailure(message) {
    return Notify.failure(message);
  }
}
