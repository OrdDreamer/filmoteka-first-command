import modalFormFilmTemplate from '../../partials/templates/film-modal-window.hbs';
import { openModalWindow } from './openModalWindow';

export class FilmModalWindow {
  constructor(userLibrary) {
    this.userLibrary = userLibrary;
    this.store = {
      showNextCallbacks: new Set(),
      showPrevCallbacks: new Set(),
    };
  }

  drawView(data) {
    this.userLibrary.removeListenerOnUpdate(this.handleLibraryUpdate);
    this.data = data;
    this.updateView();
    this.userLibrary.addListenerOnUpdate(this.handleLibraryUpdate);
  }

  updateView() {
    this.removeListeners();

    this.data.watched = this.userLibrary.isWatched(this.data.id);
    this.data.queue = this.userLibrary.isQueue(this.data.id);
    openModalWindow(modalFormFilmTemplate({
      ...this.data,
      genres: this.data.genres.join(', '),
      tab: this.data.tab || 'info',
    }));

    this.addListeners();
  }

  addListeners() {
    const tabInfoButton = document.querySelector('#tab-info');
    tabInfoButton?.addEventListener('click', this.showInfoTab);

    const tabVideoButton = document.querySelector('#tab-video');
    tabVideoButton?.addEventListener('click', this.showVideoTab);

    const arrowPrev = document.querySelector('#arrow-prev');
    arrowPrev?.addEventListener('click', this.showPrev);

    const arrowNext = document.querySelector('#arrow-next');
    arrowNext?.addEventListener('click', this.showNext);

    const addToWatched = document.querySelector('#add-to-watched');
    addToWatched?.addEventListener('click', this.addToWatched);

    const addToQueue = document.querySelector('#add-to-queue');
    addToQueue?.addEventListener('click', this.addToQueue);

    const removeFromWatched = document.querySelector('#remove-from-watched');
    removeFromWatched?.addEventListener('click', this.removeFromWatched);

    const removeFromQueue = document.querySelector('#remove-from-queue');
    removeFromQueue?.addEventListener('click', this.removeFromQueue);
  }

  removeListeners() {
    const tabInfoButton = document.querySelector('#tab-info');
    tabInfoButton?.removeEventListener('click', this.showInfoTab);

    const tabVideoButton = document.querySelector('#tab-video');
    tabVideoButton?.removeEventListener('click', this.showVideoTab);

    const arrowPrev = document.querySelector('#arow-prev');
    arrowPrev?.removeEventListener('click', this.showPrev);

    const arrowNext = document.querySelector('#arow-next');
    arrowNext?.removeEventListener('click', this.showNext);

    const addToWatched = document.querySelector('#add-to-watched');
    addToWatched?.removeEventListener('click', this.addToWatched);

    const addToQueue = document.querySelector('#add-to-queue');
    addToQueue?.removeEventListener('click', this.addToQueue);

    const removeFromWatched = document.querySelector('#remove-from-watched');
    removeFromWatched?.removeEventListener('click', this.removeFromWatched);

    const removeFromQueue = document.querySelector('#remove-from-queue');
    removeFromQueue?.removeEventListener('click', this.removeFromQueue);
  }

  handleLibraryUpdate = () => {
    this.updateView();
  }

  addToWatched = () => {
    this.userLibrary.addToLibrary(this.data.id, this.data.title, true);
  };

  addToQueue = () => {
    this.userLibrary.addToLibrary(this.data.id, this.data.title, false);
  };

  removeFromWatched = () => {
    this.userLibrary.removeFromLibrary(this.data.id, this.data.title);
  };

  removeFromQueue = () => {
    this.userLibrary.removeFromLibrary(this.data.id, this.data.title);
  };

  showInfoTab = () => {
    this.data.tab = 'info';
    this.updateView();
  };

  showVideoTab = () => {
    this.data.tab = 'video';
    this.updateView();
  };

  showNext = () => {
    for (const callback of this.store.showNextCallbacks) {
      callback(this.data.id);
    }
  };

  showPrev = () => {
    for (const callback of this.store.showPrevCallbacks) {
      callback(this.data.id);
    }
  };

  addListenersOnShowNext(callback) {
    if (typeof callback === 'function') {
      this.store.showNextCallbacks.add(callback);
    }
  }

  addListenersOnShowPrev(callback) {
    if (typeof callback === 'function') {
      this.store.showPrevCallbacks.add(callback);
    }
  }
}
