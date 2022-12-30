export class Preloader {
  static refs = {
    loaderEl: document.querySelector('.preloader'),
    percentsEl: document.querySelector('.percents'),
  };

  showLoader() {
    return Preloader.refs.loaderEl.classList.remove('preloader-invisible');
  }

  addLoader(data) {
    console.log(data.length);
    let i = 0;

    data.forEach(file => {
      i++;
      console.log(file);

      // percentsEl.innerHTML = ((100 / data.length) * i).toFixed(0);
      Preloader.refs.percentsEl.innerHTML = ((i * 100) / data.length).toFixed(0);
    });
  }

  hideLoader() {
    return Preloader.refs.loaderEl.classList.add('preloader-invisible');
  }
}

// экземпляр класса
// const loader = new Preloader();

// вызов методов класса
// loader.showLoader();
// loader.addLoader(data.hits);
// loader.hideLoader();
