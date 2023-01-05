import FilmotekaAPI from './js/FilmotekaAPI';
import { getFilmItemElement } from "./js/film-item";
import { anchors, scrollpos } from './js/anchor';
import { Header } from './js/header';

import { getAuth } from 'firebase/auth';
import { initFirebase } from './js/firebase';
import { userSignIn, userSignOut } from './js/auth';

import './js/team';
import './js/modal_team.js';





class App {

  constructor() {
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
  }

  draw() {
    // TODO Remove start
    document.querySelector("#log-in").addEventListener("click", userSignIn);
    document.querySelector("#log-out").addEventListener("click", userSignOut);
    console.log("Draw");
    console.log(this.user ? "Authenticated user" : "Not authenticated user");
    // TODO Remove end

    this.drawHeader();
  }

  drawHeader() {
    this.header.drawView({
      authenticate: Boolean(this.user),
      context: "home" // "library"
    });
  }
}

new App();