export class Preloader {
  static refs = {
    loaderEl: document.querySelector('.preloader'),
  };

  showLoader() {
    return Preloader.refs.loaderEl.classList.remove('preloader-invisible');
  }

  hideLoader() {
    return Preloader.refs.loaderEl.classList.add('preloader-invisible');
  }
}

// экземпляр класса
// const loader = new Preloader();

// вызов методов класса
// loader.showLoader();
// loader.hideLoader();
