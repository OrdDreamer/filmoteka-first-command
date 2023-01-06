import Pagination from 'tui-pagination';


const refs = {
     moviesGalleryRef: document.querySelector('.box-movies'),
}

const options = {
  totalItems: 500,
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


function moreMovies(event) {
  const currentPage = event.page;
  fetchedMovies(currentPage)
  return resetPage();
    ;
}


export function getInfoFromFns (totalPages,currentPage) {

options.totalItems = totalPages;
options.page = currentPage;

const pagination = new Pagination('pagination', options);
pagination.on('afterMove', moreMovies);
pagination.reset(totalItems);

}

