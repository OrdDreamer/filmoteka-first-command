import containerTemplate from "../partials/templates/item-container.hbs"
import { getFilmItemElement } from './film-item';
import Pagination from 'tui-pagination';

export default class ItemContainer {
  constructor(targetSelector) {
    this.refs = this.getRefs(targetSelector);
    this.initPagination();
  }

  getRefs(targetSelector) {
    return {
      target: document.querySelector(targetSelector),
    }
  }

  drawView(data) {
    const itemsMarkup = data.items.map((itemData) => {
      return getFilmItemElement(itemData);
    }).join("");

    this.refs.target.innerHTML = containerTemplate({ itemsMarkup });

    this.pagination.setTotalItems(data.totalItems);
    this.pagination.movePageTo(data.page);
    this.refs.target.appendChild(this.paginationElement);
  }

// {
//   items: [],
//   totalItems: 200,
//   page: 2,
//   totalPages: 20,
// }

  initPagination() {
    this.paginationElement = document.createElement("div");
    this.pagination = new Pagination(this.paginationElement, {
      itemsPerPage: 20,
      visiblePages: 5,
      centerAlign: true
    });
  }
}
