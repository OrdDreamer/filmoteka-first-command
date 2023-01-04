import FilmotekaAPI from './js/FilmotekaAPI';
import { getFilmItemElement } from './js/film-item';
import { anchors, scrollpos } from './js/anchor';

import { getAuth } from 'firebase/auth';
import { initFirebase } from './js/firebase';
import { userSignIn, userSignOut } from './js/auth';






class App {

  constructor() {
    initFirebase();
    this.auth = getAuth();

    this.auth.onAuthStateChanged((res) => {
      this.user = res;
      this.draw();
    });
  }

  draw() {
    console.log("Draw");
    console.log(this.user ? "Authenticated user" : "Not authenticated user");
    document.querySelector("#log-in").addEventListener("click", userSignIn);
    document.querySelector("#log-out").addEventListener("click", userSignOut);
  }
}

new App();























