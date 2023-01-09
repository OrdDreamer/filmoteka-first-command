import * as Handlebars from 'handlebars';

import { getAuth } from 'firebase/auth';
import { initFirebase } from './js/firebase';
import { userSignIn, userSignOut } from './js/auth';
import FilmotekaAPI from './js/FilmotekaAPI';

import { Header } from './js/view/Header';
import { Notiflix } from './js/view/Notiflix';
import { Preloader } from './js/view/Preloader';
import ItemContainer from './js/view/ItemContainer';
import ContainerInfo from './js/view/ContainerInfo';
import { initAboutTeam } from './js/view/team';
import { initAnchors } from './js/view/anchor';
import { FilmModalWindow } from './js/view/FilmModalWindow';
import { initFavicon } from './js/view/animateFavicon'


class App {

  constructor() {
    this.initHandlebarsHelpers();
    this.initComponents();
    this.initAPI();
    initFirebase();

    this.state = {
      url: "home",
      librarySection: "watched",
      searchQuery: "",
      pageNumber: 1,
      totalPages: 1,
      processCode: null,
      items: [],
    };

    this.auth = getAuth();

    this.preloader.showLoader();
    this.auth.onAuthStateChanged((res) => {
      this.preloader.hideLoader();
      this.user = res;
      this.state.url = "home";
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
    this.initFilmInfoModal();

    initAboutTeam();
    initAnchors();
    initFavicon();
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
    this.itemContainer.addListenerOnClickCard(this.handleClickCard);
  }

  initFilmInfoModal() {
    this.filmInfoModal = new FilmModalWindow();
  }

  draw() {
    this.itemContainer.clear();
    this.drawHeader();
    this.drawContainer();
  }

  async drawFilmInfoModal(data) {
    console.log(data);
    if (!data.hasOwnProperty("videoSrc")) {
      data.videoSrc = await this.apiService.getVideo(data.id);
    }
    if (!data.hasOwnProperty("originalTitle")) {
      data.originalTitle = await this.apiService.getFilmInfo(data.id).then(data => data.originalTitle);
    }
    this.filmInfoModal.drawView(data);
  }

  drawHeader() {
    this.header.drawView({
      authenticate: Boolean(this.user),
      url: this.state.url,
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
    this.state.url = "home";
    this.state.pageNumber = 1;
    this.state.searchQuery = "";
    this.draw();
  }

  showLibraryPage() {
    this.state.url = "library";
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
  };

  handleChangeContainerPage = (page) => {
    this.state.pageNumber = page;
    this.drawContainer();
  };

  handleClickCard = (id) => {
    const data = this.state.items.find(e => e.id === Number(id));
    if (data) {
      this.drawFilmInfoModal(data);
    }
  }

  drawContainer() {
    this.containerInfo.clear();

    const code = this.getRandomCode();
    const callback = (res) => {
      if (!this.checkCode(code)) {
        return;
      }
      this.showItems(res.results, res.totalResults, res.page, res.totalPages);
    };

    if (this.state.url === "home") {
      if (!this.state.searchQuery) {
        this.apiService.getMostPopular(this.state.pageNumber).then(callback); // TODO timeWeek
        return;
      }
      this.apiService.searchMovie(this.state.searchQuery, this.state.pageNumber).then(callback);
    } else if (this.state.url === "library") {
      // TODO library
    }

  }

  showItems(items, totalItems, page, totalPages) {
    this.state.totalPages = totalPages;
    this.state.items = items;

    const infoType = this.state.url === "home"
      ? this.state.searchQuery
        ? "search"
        : "trend"
      : this.state.url === "home" ? this.state.librarySection : "";

    this.containerInfo.drawView({
      type: infoType,
      count: totalItems,
    });

    this.itemContainer.drawView({
      items,
      totalItems,
      page,
    });
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

