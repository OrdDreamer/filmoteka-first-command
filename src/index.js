import FilmotekaAPI from './js/FilmotekaAPI';
import Library from './js/Library';
import { getFilmItemElement } from "./js/film-item";


import { showAuthBlock, showNavBlock } from './js/header';

import { addListenerOnInputSearch } from './js/search';

onInputSearch((query) => {
    
    console.log(' 1 function: ',query)
})

onInputSearch((query) => {
    
    console.log(' 2 function: ',query)
})