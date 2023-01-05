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
// import './js/search';




class App {

  constructor() {
    this.initHandlebars();
    this.initComponents();
    initFirebase();
    this.auth = getAuth();

    this.auth.onAuthStateChanged((res) => {
      this.user = res;
      this.draw();
    });
  }

  initComponents() {
    this.header = new Header("#header");
    this.header.addListenersOnSignOut(userSignOut);
    this.header.addListenersOnSignIn(userSignIn);
    this.header.addListenersOnSearchInput();
    this.header.addListenersHeaderWatched();
    this.header.addListenersHeaderQueue();
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
      // context: "library"
      context:  "home"
    });
  }

  initHandlebars() {
    Handlebars.registerHelper('ifequal', function (firstValue, secondValue) {
      return firstValue === secondValue;
    });

  }
}

new App();