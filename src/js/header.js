import headerTemplate from "../partials/templates/header.hbs"



export class Header {
  constructor(targetSelector) {
    this.refs = this.getRefs(targetSelector);
    this.signOutCallbacks = new Set();
    this.signInCallbacks = new Set();
    this.searchInputCallbacks = new Set();
    this.headerWatchedCallbacks = new Set();
    this.headerQueueCallbacks = new Set();

  }

  drawView(model) {
    this.removeListeners();
    this.refs.target.innerHTML = headerTemplate({
      authenticate: model.authenticate,
      context: model.context,
    });
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
      searchInput.addEventListener('input', this.onSearchInput);
    }

    const headerWatched = document.querySelector('#header-watched');
    if (headerWatched) {
      headerWatched.addEventListener('click', this.onHeaderWatched);
    }

    const headerQueue = document.querySelector('#header-queue');
    if (headerQueue) {
      headerQueue.addEventListener('click', this.onHeaderQueue);
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
  }



  onSearchInput = (event) => {
    console.log("searchInput");

    for (const callback of this.searchInputCallbacks) {
      callback(event.currentTarget.value);
    }
  }

  onSignInClick = () => {
    console.log("on sign in");

    for (const callback of this.signInCallbacks) {
      callback();
    }
  }

  onSignOutClick = () => {
    console.log("on sign out");

    for (const callback of this.signOutCallbacks) {
      callback();
    }
  }

  onHeaderWatched = () => {
    console.log("Watched");

    for (const callback of this.headerWatchedCallbacks) {
      callback();
    }
  }

  onHeaderQueue = () => {
    console.log("Queue");

    for (const callback of this.headerQueueCallbacks) {
      callback();
    }
  }


  addListenersOnSearchInput(callback) {
    if (typeof callback === "function") {
      this.searchInputCallbacks.add(callback);
    }
  }

  addListenersOnSignOut(callback) {
    if (typeof callback === "function") {
      this.signOutCallbacks.add(callback);
    }
  }

  addListenersOnSignIn(callback) {
    if (typeof callback === "function") {
      this.signInCallbacks.add(callback);
    }
  }

  addListenersHeaderWatched(callback) {
    if (typeof callback === "function") {
      this.headerWatchedCallbacks.add(callback);
    }
  }

  addListenersHeaderQueue(callback) {
    if (typeof callback === "function") {
      this.headerQueueCallbacks.add(callback);
    }
  }
}

// Написати новий хелпер
// Написати нову умовну конструкцію для двох блоків
// Написати нову умовну конструкцію для класу .current для кнопки .nav-button
