import { Notify } from 'notiflix';

export class Notiflix {
  showSuccess(message) {
    return Notify.success(message, {
      position: 'right-bottom',
    });
  }
  showInfo(message) {
    return Notify.info(message, {
      position: 'right-bottom',
    });
  }

  showWarning(message) {
    return Notify.warning(message, {
      position: 'right-bottom',
    });
  }

  showFailure(message) {
    return Notify.failure(message, {
      position: 'right-bottom',
    });
  }
}
