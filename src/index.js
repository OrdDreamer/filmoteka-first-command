import FilmotekaAPI from './js/FilmotekaAPI';
import { anchors, initAnchors, scrollpos } from './js/anchor';
import { Header } from './js/header';

import * as Handlebars from 'handlebars';

import { getAuth } from 'firebase/auth';
import { initFirebase } from './js/firebase';
import { userSignIn, userSignOut } from './js/auth';

import { Notiflix } from './js/Notiflix';
import { Preloader } from './js/Preloader';
import ItemContainer from './js/ItemContainer';
import ContainerInfo from './js/ContainerInfo';
import { initAboutTeam } from './js/team';


class App {

  constructor() {
    this.initHandlebarsHelpers();
    this.initComponents();
    this.initAPI();
    initFirebase();

    this.state = {
      page: "home",
      librarySection: "watched",
      searchQuery: "",
      pageNumber: 1,
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
    this.initContainerInfo();
    this.initContainer();

    initAboutTeam();
    initAnchors();
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
    this.header.addListenersOnSearchInput(this.handleSearchInput);
    this.header.addListenersOnChangePage(this.handleChangePage);
    this.header.addListenersOnChangeLibrarySection(this.handleChangeLibrarySection);
  }

  initContainerInfo() {
    this.containerInfo = new ContainerInfo("#content-info");
  }

  initContainer() {
    this.itemContainer = new ItemContainer("#content");
    this.itemContainer.addListenerOnChangePage(this.handleChangeContainerPage);
  }

  draw() {
    this.itemContainer.clear();
    this.drawHeader();
    this.drawContainer();
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
    this.state.pageNumber = 1;
    this.state.searchQuery = "";
    this.draw();
  }

  showLibraryPage() {
    this.state.page = "library";
    this.state.librarySection = "watched";
    this.state.pageNumber = 1;
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
    this.state.searchQuery = query || "";
    this.state.pageNumber = 1;

    this.drawContainer();
  }

  handleChangeContainerPage = (page) => {
    this.state.pageNumber = page;
    this.drawContainer();
  }

  drawContainer() {
    this.containerInfo.clear();

    const code = this.getRandomCode();
    const callback = (res) => {
      if (!this.checkCode(code)) {
        return;
      }
      this.showItems(res.finded, res.totalResults, res.page);
    };

    if (this.state.page === "home") {
      if (!this.state.searchQuery) {
        this.apiService.getMostPopular(this.state.pageNumber).then(callback); // TODO timeWeek
        return;
      }
      this.apiService.searchMovie(this.state.searchQuery, this.state.pageNumber).then(callback);
    } else if (this.state.page === "library") {
      // TODO library
    }

  }

  async showItems(items, totalItems, page) {
    const genres = await this.apiService.getGenres();

    const infoType = this.state.page === "home"
      ? this.state.searchQuery
        ? "search"
        : "trend"
      : this.state.page === "home" ? this.state.librarySection : "";

    this.containerInfo.drawView({
      type: infoType,
      count: totalItems,
    });

    this.itemContainer.drawView({
      items,
      totalItems,
      page,
      genres,
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

