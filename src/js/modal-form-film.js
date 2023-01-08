import modalFormFilmTemplate from '../partials/templates/modal-form-film.hbs';

let btnClose;
let backdrop;
export class FilmModalWindow {
  constructor(targetSelector) {
    this.refs = this.getRefs(targetSelector);
    //   this.keyPressCallbacks = new Set();
    this.showNextCallbacks = new Set();
    this.showPrevCallbacks = new Set();
  }

  getRefs(targetSelector) {
    return {
      target: document.querySelector(targetSelector),
    };
  }

  drawView(data) {
    this.removeListeners();
    this.data = data;
    this.refs.target.innerHTML = modalFormFilmTemplate({
      ...data,
      tab: data.tab || 'info',
    });
    this.addListeners();
  }

  addListeners() {
    const tabInfoButton = document.querySelector('#tab-info');
    if (tabInfoButton) {
      tabInfoButton.addEventListener('click', this.showInfoTab);
    }

    const tabVideoButton = document.querySelector('#tab-video');
    if (tabVideoButton) {
      tabVideoButton.addEventListener('click', this.showVideoTab);
    }

    const arrowPrev = document.querySelector('#arrow-prev');
    if (arrowPrev) {
      arrowPrev.addEventListener('click', this.showPrev);
    }

    const arrowNext = document.querySelector('#arrow-next');
    if (arrowNext) {
      arrowNext.addEventListener('click', this.showNext);
    }

    btnClose = document.querySelector('.lightbox__close-btn');
    if (btnClose) {
      btnClose.addEventListener('click', closeModalWindow);
    }

    // backdrop = document.querySelector('[data-modal="backdrop"]');
    // if (backdrop) {
    //   backdrop.addEventListener('click', closeToBackdrop);
    // }

    window.addEventListener('keydown', onEscKeyPress);
  }

  removeListeners() {
    const tabInfoButton = document.querySelector('#tab-info');
    if (tabInfoButton) {
      tabInfoButton.removeEventListener('click', this.showInfoTab);
    }

    const tabVideoButton = document.querySelector('#tab-video');
    if (tabVideoButton) {
      tabVideoButton.removeEventListener('click', this.showVideoTab);
    }

    const arrowPrev = document.querySelector('#arow-prev');
    if (arrowPrev) {
      arrowPrev.removeEventListener('click', this.showPrev);
    }

    const arrowNext = document.querySelector('#arow-next');
    if (arrowNext) {
      arrowNext.removeEventListener('click', this.showNext);
    }
  }

  showInfoTab = () => {
    this.data.tab = 'info';
    this.drawView(this.data);
    console.log('showInfoTab');
  };

  showVideoTab = () => {
    this.data.tab = 'video';
    this.drawView(this.data);
    console.log('showVideoTab');
  };

  showNext = () => {
    console.log('next');
    for (const callback of this.showNextCallbacks) {
      callback();
    }
  };

  showPrev = () => {
    console.log('prev');
    for (const callback of this.showPrevCallbacks) {
      callback();
    }
  };

  addListenersOnShowNext(callback) {
    if (typeof callback === 'function') {
      this.showNextCallbacks.add(callback);
    }
  }

  addListenersOnShowPrev(callback) {
    if (typeof callback === 'function') {
      this.showPrevCallbacks.add(callback);
    }
  }
}

function closeModalWindow() {
  //if (!backdrop.classList.contains('visually-hidden')) {
  document.querySelector('#film-info').classList.add('visually-hidden');
  btnClose.removeEventListener('click', closeModalWindow);
  window.removeEventListener('keydown', onEscKeyPress);
  backdrop.removeEventListener('click', closeToBackdrop);
  //}
}

// function closeToBackdrop(e) {
//   const name = e.target.className;
//   if (name === 'backdrop') {
//     closeModalWindow();
//   }
// }

function onEscKeyPress(e) {
  if (e.code === 'Escape') {
    closeModalWindow();
  }
}
