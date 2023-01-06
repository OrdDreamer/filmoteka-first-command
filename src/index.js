import FilmotekaAPI from './js/FilmotekaAPI';
import { getFilmItemElement } from "./js/film-item";
import { anchors, scrollpos } from './js/anchor';
import { Header } from './js/header';

import * as Handlebars from 'handlebars';

import { getAuth } from 'firebase/auth';
import { initFirebase } from './js/firebase';
import { userSignIn, userSignOut } from './js/auth';

import './js/team';
import './js/modal_team.js';
import { Notiflix } from './js/Notiflix';
import { Preloader } from './js/Preloader';




class App {

  constructor() {
    this.initHandlebarsHelpers();
    this.initComponents();
    initFirebase();
    this.auth = getAuth();

    this.preloader.showLoader();
    this.auth.onAuthStateChanged((res) => {
      this.preloader.hideLoader();
      this.user = res;
      this.showAuthNotification();
      this.draw();
    });
  }

  initComponents() {
    this.initNotification();
    this.initPreloader();
    this.initHeader();
  }

  initNotification() {
    this.notiflix = new Notiflix();
  }

  initPreloader() {
    this.preloader = new Preloader();
  }

  initHeader() {
    this.header = new Header("#header");
    this.header.addListenersOnSignOut(userSignOut);
    this.header.addListenersOnSignIn(userSignIn);
    this.header.addListenersOnSearchInput(); // TODO
    this.header.addListenersOnChangePage(); // TODO
    this.header.addListenersOnChangeLibrarySection(); // TODO
  }

  draw() {
    // TODO Remove start

    console.log("Draw");
    console.log(this.user ? "Authenticated user" : "Not authenticated user");
    // TODO Remove end

    this.drawHeader();
  }

  drawHeader() {
    this.header.drawView({
      authenticate: Boolean(this.user),
      page: "library",
      // context:  "home"
      librarySection: "watched",
      // librarySection: "queue",
    });
  }

  showAuthNotification() {
    console.log(this.user);
    if (this.user) {
      this.notiflix.showInfo(`You are authenticated as ${this.user.displayName}`)
    } else {
      this.notiflix.showInfo("Authenticate to access all features");
    }
  }

  initHandlebarsHelpers() {
    Handlebars.registerHelper('ifequal', function (firstValue, secondValue) {
      return firstValue === secondValue;
    });
  }
}

new App();

