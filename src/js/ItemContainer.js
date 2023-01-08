import { getFilmItemElement } from "./film-item";
import Pagination from "tui-pagination";
import * as Handlebars from "handlebars";

const template = `
<div class="item-container box-movies">
  {{{items}}}
</div>
`

export default class ItemContainer {
  constructor(targetSelector) {
    this.changePageCallbaks = new Set();
    this.refs = this.getRefs(targetSelector);
    this.initPagination();
    this.template = Handlebars.compile(template);
  }

  getRefs(targetSelector) {
    return {
      target: document.querySelector(targetSelector),
    };
  }

  drawView(data) {
    const itemsMarkup = data.items.map((itemData) => {
      return getFilmItemElement(itemData);
    }).join("");
    this.refs.target.innerHTML = this.template({ items: itemsMarkup });

    if (data.totalItems === data.items.length) {
      return;
    }

    this.pagination.off("afterMove", this.handleChangePage);
    this.pagination.setTotalItems(data.totalItems);
    this.pagination.movePageTo(data.page);
    this.refs.target.appendChild(this.paginationElement);
    this.pagination.on("afterMove", this.handleChangePage);
  }

// Example data
// {
//   items: [],
//   totalItems: 200,
//   page: 2,
// }

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
    for (const callback of this.changePageCallbaks) {
      callback(event.page);
    }
  };

  addListenerOnChangePage(callback) {
    if (typeof callback === "function") {
      this.changePageCallbaks.add(callback);
    }
  }

}



























