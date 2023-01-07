    import Pagination from 'tui-pagination';
    import {getFilmItemElement} from './film-item';
    import FilmotekaAPI from './FilmotekaAPI';

    const newFilmotekaAPI = new FilmotekaAPI();
    const refs = {
        moviesGalleryRef: document.querySelector('.box-movies'),
}

    export default class Pagination {
        constructor() {
            this.arrayData = [];
            this.page = 1;
            this.totalPages = 500;
            this.options = {
                totalItems: this.totalPages,
                itemsPerPage: 20,
                visiblePages: 5,
                page: this.page,
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


    moreMoviesByClickBtnPagination(event) {

        const currentPage = event.page;
        resetPage();
        newFilmotekaAPI.setCurrentPage(currentPage);
        // resetPage();
        return refs.moviesGalleryRef.insertAdjacentHTML('afterbegin',getFilmItemElement(this.arrayData));;
        ;
    }

    resetPage() {
        return refs.moviesGalleryRef.innerHTML = '';
    };

// має додаватися коли прийшли дані
    addPagination () {

        const pagination = new Pagination('pagination', this.options);
        pagination.on('afterMove', moreMoviesByClickBtnPagination);
      return  pagination.reset(this.totalPages);

}

    removePagination() {
        return pagination.off('aftermove',moreMoviesByClickBtnPagination);
}

    setArrayData(data){
        this.arrayData = data.results;
}
    setCurrentPage(page){
        this.page = page;
}
    setTotalPages(total){
        this.totalPages = total;
}
}

