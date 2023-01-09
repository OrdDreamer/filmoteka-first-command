import headerTemplate from "../../partials/templates/header.hbs";
import sprite from '../../images/symbol-defs.svg';
import debounce from "lodash.debounce";

const DEBOUNCE_DELAY = 1000;

export class Header {
  constructor(targetSelector) {
    this.refs = this.getRefs(targetSelector);
    this.initCallbacksStore();
  }

  initCallbacksStore() {
    this.callbacksStore = {
      signIn: new Set(),
      signOut: new Set(),
      changePage: new Set(),
      search: new Set(),
      changeLibrarySection: new Set(),
    }
  }

  drawView(data) {
    this.removeListeners();
    this.refs.target.innerHTML = headerTemplate({...data, sprite});
    this.updateBackground(data.page);
    this.addListeners();
  }

  getRefs(targetSelector) {
    return {
      target: document.querySelector(targetSelector),
    }
  }

  addListeners() {
    const singOut = document.querySelector('#sign-out');
    if (singOut) {
      singOut.addEventListener('click', this.onSignOutClick);
    }

    const singIn = document.querySelector('#sign-in');
    if (singIn) {
      singIn.addEventListener('click', this.onSignInClick);
    }

    const searchInput = document.querySelector('#search-input');
    if (searchInput) {
      searchInput.addEventListener('input', debounce(this.onSearchInput, DEBOUNCE_DELAY));
    }

    const headerWatched = document.querySelector('#header-watched');
    if (headerWatched) {
      headerWatched.addEventListener('click', this.onHeaderWatched);
    }

    const headerQueue = document.querySelector('#header-queue');
    if (headerQueue) {
      headerQueue.addEventListener('click', this.onHeaderQueue);
    }

    const headerHome = document.querySelector('#header-home');
    if (headerHome) {
      headerHome.addEventListener('click', this.onShowHomePage);
    }

    const headerLibrary = document.querySelector('#header-library');
    if (headerLibrary) {
      headerLibrary.addEventListener('click', this.onShowLibraryPage);
    }
  }

  removeListeners() {
    const singOut = document.querySelector('#sign-out');
    if (singOut) {
      singOut.removeEventListener('click', this.onSignOutClick);
    }

    const singIn = document.querySelector('#sign-in');
    if (singIn) {
      singIn.removeEventListener('click', this.onSignInClick);
    }

    const searchInput = document.querySelector('#search-input');
    if (searchInput) {
      searchInput.removeEventListener('input', this.onSearchInput);
    }

    const headerWatched = document.querySelector('#header-watched');
    if (headerWatched) {
      headerWatched.removeEventListener('click', this.onHeaderWatched);
    }

    const headerQueue = document.querySelector('#header-queue');
    if (headerQueue) {
      headerQueue.removeEventListener('click', this.onHeaderQueue);
    }

    const headerHome = document.querySelector('#header-home');
    if (headerHome) {
      headerHome.removeEventListener('click', this.onShowHomePage);
    }

    const headerLibrary = document.querySelector('#header-library');
    if (headerLibrary) {
      headerLibrary.removeEventListener('click', this.onShowLibraryPage);
    }
  }

  updateBackground(page) {
    const headerContainer = document.querySelector("#header");
    if (!headerContainer) {
      return;
    }
    if (page === "library") {
      headerContainer.classList.add('library');
    } else {
      headerContainer.classList.remove('library');
    }
  }

  onSearchInput = (event) => {
    for (const callback of this.callbacksStore.search) {
      callback(event.target.value);
    }
  }

  onSignInClick = () => {
    for (const callback of this.callbacksStore.signIn) {
      callback();
    }
  }

  onSignOutClick = () => {
    for (const callback of this.callbacksStore.signOut) {
      callback();
    }
  }

  onHeaderWatched = () => {
    for (const callback of this.callbacksStore.changeLibrarySection) {
      callback("watched");
    }
  }

  onHeaderQueue = () => {
    for (const callback of this.callbacksStore.changeLibrarySection) {
      callback("queue");
    }
  }

  onShowHomePage = () => {
    for (const callback of this.callbacksStore.changePage) {
      callback("home");
    }
  }

  onShowLibraryPage = () => {
    for (const callback of this.callbacksStore.changePage) {
      callback("library");
    }
  }

  addListenersOnSignOut(callback) {
    if (typeof callback === "function") {
      this.callbacksStore.signOut.add(callback);
    }
  }

  addListenersOnSignIn(callback) {
    if (typeof callback === "function") {
      this.callbacksStore.signIn.add(callback);
    }
  }

  addListenersOnChangePage(callback) {
    if (typeof callback === "function") {
      this.callbacksStore.changePage.add(callback);
    }
  }

  addListenersOnSearchInput(callback) {
    if (typeof callback === "function") {
      this.callbacksStore.search.add(callback);
    }
  }

  addListenersOnChangeLibrarySection(callback) {
    if (typeof callback === "function") {
      this.callbacksStore.changeLibrarySection.add(callback);
    }
  }

}
