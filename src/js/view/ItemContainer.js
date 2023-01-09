import { getFilmItemElement } from "./getFilmItemElement";
import Pagination from "tui-pagination";
import * as Handlebars from "handlebars";

const template = `
<div id="item-container" class="item-container box-movies">
  {{{items}}}
</div>
`

export default class ItemContainer {
  constructor(targetSelector) {
    this.changePageCallbaks = new Set();
    this.clickCardCalbacks = new Set();
    this.refs = this.getRefs(targetSelector);
    this.initPagination();
    this.template = Handlebars.compile(template);
  }

  getRefs(targetSelector) {
    return {
      target: document.querySelector(targetSelector),
    };
  }

// Example data
// {
//   items: [],
//   totalItems: 200,
//   page: 2,
// }

  drawView(data) {
    this.removeListeners();
    const itemsMarkup = data.items.map((itemData) => {
      return getFilmItemElement(itemData, "film-item-size");
    }).join("");
    this.refs.target.innerHTML = this.template({ items: itemsMarkup });

    if (data.totalItems === data.items.length) {
      return;
    }

    this.pagination.setTotalItems(data.totalItems);
    this.pagination.movePageTo(data.page);
    this.refs.target.appendChild(this.paginationElement);

    this.addListeners();
  }

  addListeners() {
    this.pagination.on("afterMove", this.handleChangePage);

    const container = document.querySelector("#item-container");
    container?.addEventListener("click", this.handleCardClick);
  }

  removeListeners() {
    this.pagination.off("afterMove", this.handleChangePage);

    const container = document.querySelector("#item-container");
    container?.removeEventListener("click", this.handleCardClick);
  }

  initPagination() {
    this.paginationElement = document.createElement("div");
    this.paginationElement.classList.add("tui-pagination");
    this.pagination = new Pagination(this.paginationElement, this.getPaginationOptions());
  }

  getPaginationOptions() {
    return {
      totalItems: 0,
      itemsPerPage: 20,
      visiblePages: 5,
      page: 1,
      centerAlign: true,
      firstItemClassName: 'tui-first-child',
      lastItemClassName: 'tui-last-child',
      template: {
        page: '<a href="#" class="tui-page-btn">{{page}}</a>',
        currentPage:
          '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
        moveButton:
          '<a href="#" class="tui-page-btn tui-{{type}}">' +
          '<span class="tui-ico-{{type}}">{{type}}</span>' +
          '</a>',
        disabledMoveButton:
          '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
          '<span class="tui-ico-{{type}}">{{type}}</span>' +
          '</span>',
        moreButton:
          '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
          '<span class="tui-ico-ellip">...</span>' +
          '</a>',
      },
    };
  }

  clear() {
    this.refs.target.innerHTML = "";
  }

  handleChangePage = (event) => {
    this.refs.target.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
    for (const callback of this.changePageCallbaks) {
      callback(event.page);
    }
  };

  addListenerOnChangePage(callback) {
    if (typeof callback === "function") {
      this.changePageCallbaks.add(callback);
    }
  }

  handleCardClick = (event) => {
    const id = event.target.dataset.id;
    if (!id) {
      return;
    }
    for (const callback of this.clickCardCalbacks) {
      callback(id);
    }
  }

  addListenerOnClickCard(callback) {
    if (typeof callback === "function") {
      this.clickCardCalbacks.add(callback);
    }
  }
}



























