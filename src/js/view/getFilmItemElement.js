import filmItemTemplate from '../../partials/templates/film-item.hbs';

export function getFilmItemElement(data, customClasses = "") {
  return filmItemTemplate({
    customClasses,
    filmId: data.id,
    poster: data.poster,
    imageDescription: data.title,
    title: data.title,
    genres: getGenresStr(data.genres),
    year: Number.parseInt(data.release),
    rating: data.voteAverage.toFixed(1),
  });
}

function getGenresStr(genresArray) {
  if ((genresArray.length === 1)) {
    return `${genresArray[0]}`;
  }
  if ((genresArray.length === 2)) {
    return `${genresArray[0]}, ${genresArray[1]}`;
  }
  if (genresArray.length > 2) {
    return `${genresArray[0]}, ${genresArray[1]}, Other`;
  }
  return ""
}
