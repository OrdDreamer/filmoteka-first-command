import FilmotekaAPI from './js/FilmotekaAPI';
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
import ItemContainer from './js/ItemContainer';


class App {

  constructor() {
    this.initHandlebarsHelpers();
    this.initComponents();
    this.initAPI();
    initFirebase();

    this.state = {
      page: "home",
      librarySection: "watched",
      filtersConfig: {
        type: "trend", // "search", "watched", "queue"
        searchQuery: "",
        pageNumber: 1,
      },
      processCode: null,
    };

    this.auth = getAuth();

    this.preloader.showLoader();
    this.auth.onAuthStateChanged((res) => {
      this.preloader.hideLoader();
      this.user = res;
      this.state.page = "home"
      this.showAuthNotification();
      this.draw();
    });
  }

  initAPI() {
    this.apiService = new FilmotekaAPI();
  }

  initComponents() {
    this.initNotification();
    this.initPreloader();
    this.initHeader();
    this.initContainer();
  }

  initNotification() {
    this.notiflix = new Notiflix();
  }

  initPreloader() {
    this.preloader = new Preloader();
  }

  initHeader() {
    this.header = new Header('#header');
    this.header.addListenersOnSignOut(userSignOut);
    this.header.addListenersOnSignIn(userSignIn);
    this.header.addListenersOnSearchInput(this.handleSearchInput); // TODO
    this.header.addListenersOnChangePage(this.handleChangePage); // TODO
    this.header.addListenersOnChangeLibrarySection(this.handleChangeLibrarySection); // TODO
  }

  initContainer() {
    this.itemContainer = new ItemContainer("#content")
  }

  draw() {
    // TODO Remove start

    console.log('Draw');
    console.log(this.user ? 'Authenticated user' : 'Not authenticated user');
    // TODO Remove end

    this.drawHeader();
  }

  drawHeader() {
    this.header.drawView({
      authenticate: Boolean(this.user),
      page: this.state.page,
      librarySection: this.state.librarySection,
    });
  }

  showAuthNotification() {
    if (this.user) {
      this.notiflix.showInfo(`You are authenticated as ${this.user.displayName}`);
    } else {
      this.notiflix.showInfo('Authenticate to access all features');
    }
  }

  initHandlebarsHelpers() {
    Handlebars.registerHelper('ifequal', function(firstValue, secondValue) {
      return firstValue === secondValue;
    });
  }

  handleChangePage = (page) => {
    switch (page) {
      case "home":
        this.showHomePage();
        break;

      case "library":
        this.showLibraryPage();
        break;

      default:
        console.warn(`Sorry, this page(${page}) was not found`);
    }
  };

  showHomePage() {
    this.state.page = "home";
    this.draw();
  }

  showLibraryPage() {
    this.state.page = "library";
    this.state.librarySection = "watched";
    this.draw();
  }

  handleChangeLibrarySection = (librarySection) => {
    switch (librarySection) {
      case "watched":
        this.showWatchedLibrarySection();
        break;

      case "queue":
        this.showQueueLibrarySection();
        break;

      default:
        console.warn(`Sorry, this library section(${librarySection}) was not found`);
    }
  };

  showWatchedLibrarySection() {
    this.state.librarySection = "watched";
    this.draw();
  }

  showQueueLibrarySection() {
    this.state.librarySection = "queue";
    this.draw();
  }

  handleSearchInput = (query) => {
    const code = this.getRandomCode();
    this.state.filtersConfig = {
      searchQuery: query || "",
      page: 1,
    }

    const callback = (res) => {
      if (!this.checkCode(code)) {
        return;
      }
      this.showItems(res.finded, res.page, res.totalPages); // TODO change totalPages to totalItems
    };

    if (!query) {
      this.state.filtersConfig.type = "trend";
      this.apiService.getMostPopular().then(callback); // TODO timeWeek
      return;
    }

    this.state.filtersConfig.type = "search";
    this.apiService.searchMovie(query).then(callback);
  }

  showItems(items, totalItems, page) {
    this.itemContainer.drawView({
      items,
      totalItems,
      page,
    })
  }

  getRandomCode() {
    const code = Math.floor(1 + Math.random() * 1000);
    this.state.processCode = code;
    return code;
  }

  checkCode(code) {
    return this.state.processCode === code;
  }
}

new App();

