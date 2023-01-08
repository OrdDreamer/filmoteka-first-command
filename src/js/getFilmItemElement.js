// export function getFilmItemElement({ fields }) {
//   return fields
//     .map(field => {
//       return `<div class="film-card">
//     <a href=${fields.link} class="film-card__link link" data-id="${fields.id}">
//       <picture class="film-card__picture">
//         <source
//           srcset="
//           ${fields.desktopImage1x} 1x,
//           ${fields.desktopImage2x} 2x
//         "
//           media="(min-width: 1280px"
//         />
//         <source
//           srcset="
//           ${fields.tabletImage1x} 1x,
//           ${fields.tabletImage2x} 2x
//         "
//           media="(min-width: 768px"
//         />
//         <source
//           srcset="
//           ${fields.mobileImage1x} 1x,
//           ${fields.mobileImage2x} 2x
//         "
//           media="(min-width: 320px"
//         />
//         <img
//           src="${fields.mobileImage1x}"
//           alt=" ${fields.imageDescription}"
//           class="filmoteka__image"
//         />
//       </picture>
//       <p class="film-card__name"> ${fields.filmName}</p>
//       <p class="film-card__data">
//       ${fields.filmGenres} <span class="film-card__divider">&nbsp;|&nbsp;</span>
//         <span class="film-card__year"> ${fields.yearOfPub}</span>
//         <span class="film-card__rating">${fields.filmRating}</span>
//       </p>
//     </a>
//   </div>
//   `;
//     })
//     .join('');
// }

import filmItemTemplate from '../partials/templates/film-item.hbs';

export function getFilmItemElement(data, listOfGenreNames, customClasses = "") {
  return filmItemTemplate({
    customClasses,
    filmId: data.id,
    // desktopImage1x:
    // desktopImage2x:
    // tabletImage1x:
    // tabletImage2x:
    // mobileImage1x:
    // mobileImage2x:
    imageDescription: data.original_title,
    title: data.title,
    genres: getGenres(data.genre_ids, listOfGenreNames),
    year: Number.parseInt(data.release_date),
    rating: data.vote_average.toFixed(1),
  });
}

function getGenres(genresArray, listOfGenreNames) {
  const getGenre = function(id) {
    const result = listOfGenreNames.find((element) => element.id === id);
    return result ? result.name : "";
  }

  if ((genresArray.length = 1)) {
    return `${getGenre(genresArray[0])}`;
  }
  if ((genresArray.length = 2)) {
    return `${getGenre(genresArray[0])}, ${getGenre(genresArray[1])}`;
  }
  if (genresArray.length > 2) {
    return `${getGenre(genresArray[0])}, ${getGenre(genresArray[1])}, Other`;
  }
  return "";
}
