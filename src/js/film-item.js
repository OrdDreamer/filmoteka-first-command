export function getFilmItemElement({ fields }) {
  return fields
    .map(field => {
      return `<div class="film-card">
    <a href=${fields.link} class="film-card__link link" data-id="${fields.id}">
      <picture class="film-card__picture">
        <source
          srcset="
          ${fields.desktopImage1x} 1x,
          ${fields.desktopImage2x} 2x
        "
          media="(min-width: 1280px"
        />
        <source
          srcset="
          ${fields.tabletImage1x} 1x,
          ${fields.tabletImage2x} 2x
        "
          media="(min-width: 768px"
        />
        <source
          srcset="
          ${fields.mobileImage1x} 1x,
          ${fields.mobileImage2x} 2x
        "
          media="(min-width: 320px"
        />
        <img
          src="${fields.mobileImage1x}"
          alt=" ${fields.imageDescription}"
          class="filmoteka__image"
        />
      </picture>
      <p class="film-card__name"> ${fields.filmName}</p>
      <p class="film-card__data">
      ${fields.filmGenres} <span class="film-card__divider">&nbsp;|&nbsp;</span>
        <span class="film-card__year"> ${fields.yearOfPub}</span>
        <span class="film-card__rating">${fields.filmRating}</span>
      </p>
    </a>
  </div>
  `;
    })
    .join('');
}

// export function getFilmItemElement({ id, image, title, genres, yearOfPub, rating }) {
//   return `
//     <div>
//       Film item element
//     </div>
//   `;
// }
