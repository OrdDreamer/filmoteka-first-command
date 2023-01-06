import headerTemplate from "../partials/templates/header.hbs"



export class Header {
  constructor(targetSelector) {
    this.refs = this.getRefs(targetSelector);
    this.signOutCallbacks = new Set();
    this.signInCallbacks = new Set();
    this.searchInputCallbacks = new Set();
    this.headerWatchedCallbacks = new Set();
    this.headerQueueCallbacks = new Set();
    this.headerHomeCallbacks = new Set();
    this.headerLibraryCallbacks = new Set();
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

    const headerHome = document.querySelector('#header-home');
    if (headerHome) {
      headerHome.addEventListener('click', this.onHeaderHome);
    }

    const headerLibrary = document.querySelector('#header-library');
    if (headerLibrary) {
      headerLibrary.addEventListener('click', this.onHeaderLibrary);
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
      headerHome.removeEventListener('click', this.onHeaderHome);
    }

    const headerLibrary = document.querySelector('#header-library');
    if (headerLibrary) {
      headerLibrary.removeEventListener('click', this.onHeaderLibrary);
    }
  }



  onSearchInput = (event) => {
    console.log("searchInput");

    for (const callback of this.searchInputCallbacks) {
      callback(event.currentTarget.value);
    }
    console.log(event.currentTarget.value)
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

    const headerLibrary = document.querySelector('#header-library');
    const headerHome = document.querySelector('#header-home');
    
    

    if (headerLibrary.classList === 'current') {
      headerLibrary.classList.toggle('current');
      headerHome.classList.toggle('current');
    }
  }

  onHeaderWatched = () => {
    console.log("Watched");

    for (const callback of this.headerWatchedCallbacks) {
      callback();
    }
    const headerWatched = document.querySelector('#header-watched');
    const headerQueue = document.querySelector('#header-queue');
    if (headerWatched.classList !== 'active') {
      headerWatched.classList.toggle('active');
      headerQueue.classList.toggle('active');
    }
  }

  onHeaderQueue = () => {
    console.log("Queue");

    for (const callback of this.headerQueueCallbacks) {
      callback();
    }
    const headerWatched = document.querySelector('#header-watched');
    const headerQueue = document.querySelector('#header-queue');
    if (headerQueue.classList !== 'active') {
      headerWatched.classList.toggle('active');
      headerQueue.classList.toggle('active');
    }
  }

  onHeaderHome = () => {
    console.log("Home");

    for (const callback of this.headerHomeCallbacks) {
      callback();
    }
    const headerContainer = document.querySelector('#header');
    const headerHome = document.querySelector('#header-home');
    const headerLibrary = document.querySelector('#header-library');
    headerContainer.classList.toggle('library');
    this.drawView({ authenticate: true, context: "home" })
        if (headerLibrary.classList === 'current') {
      headerLibrary.classList.toggle('current');
      headerHome.classList.toggle('current');
      
    }
  }

  onHeaderLibrary = () => {
    console.log("Library");

    for (const callback of this.headerHomeCallbacks) {
      callback();
    }
    const headerContainer = document.querySelector('#header');
    headerContainer.classList.toggle('library');
    
    this.drawView({ authenticate: true, context: "library" })
    const headerLibrary = document.querySelector('#header-library');
    headerLibrary.classList.toggle('current');
    const headerHome = document.querySelector('#header-home');
    headerHome.classList.toggle('current');
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

  addListenersHeaderHome(callback) {
    if (typeof callback === "function") {
      this.headerHomeCallbacks.add(callback);
    }
  }

  addListenersHeaderLibrary(callback) {
    if (typeof callback === "function") {
      this.headerLibraryCallbacks.add(callback);
    }
  }
}

// Написати новий хелпер
// Написати нову умовну конструкцію для двох блоків
// Написати нову умовну конструкцію для класу .current для кнопки .nav-button


