import axios from 'axios';

axios.defaults.baseURL = `https://api.themoviedb.org/3/`;

const apiKey = '6c57fb02719926393bb8c06aa147886f';

export default class FilmotekaAPI {

  constructor() {
    this._apiKey = apiKey;
    this.genre = '';
    this.query = '';
    this.page = 1;
  }

  //  якщо не передавати timeWeek параметра повертає масив обєктів за день, якщо true за тиждень
  async getMostPopular(page = 1, timeWeek) {
    try {
      let searchTime = `trending/movie/day?api_key=${this._apiKey}&page=${page}`;
      if (timeWeek) {
        searchTime = `trending/movie/week?api_key=${this._apiKey}&page=${page}`;
      }
      const response = await axios.get(searchTime);
      const array = {
        page: response.data.page,
        totalPages: response.data.total_pages,
        totalResults: response.data.total_results,
        finded: response.data.results,
      };
      return array;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Пошук фільму за ключовим словом і вибір сторінки
  async searchMovie(query, page = 1) {
    try {
      const response = await axios.get(
        `search/movie?api_key=${this._apiKey}&query=${query}&page=${page}`
      );
      console.log(response);
      const array = {
        finded: response.data.results,
        page: response.data.page,
        totalPages: response.data.total_pages,
        totalResults: response.data.total_results,
        
      };
      return array;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Отримання повної інформації кінофільму за допомогою ID
  async getInfoCard(movie_id) {
    try {
      const response = await axios.get(`movie/${movie_id}?api_key=${this._apiKey}`);
      console.log(response);
      const array = {
        title: response.data.title,
        genre: response.data.genres.map(genre => genre.name).join(','),
        release: response.data.release_date,
        vote: response.data.vote_average,
        votes: response.data.vote_count,
        popularity: response.data.popularity,
        originalTitle: response.data.original_title,
        about: response.data.overview,
        poster: `https://image.tmdb.org/t/p/w400${response.data.poster_path}`,
      };
      return array;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Отримання посилання трейлера з ютуб
  async getVideo(movie_id) {
    try {
      const response = await axios.get(`movie/${movie_id}/videos?api_key=${this._apiKey}`);

      const videoID = response.data.results.map(result => result.key).slice(0, 1);
      return `https://www.youtube.com/watch?v=${videoID}`;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // const abs = Math.abs;
  // const closest = (a,g) => a.reduce((p,c) => abs(c-g) < abs(p-g) ? c : p);

  async getPoster(movie_id) {
    try {
      const response = await axios.get(`movie/${movie_id}/images?api_key=${this._apiKey}`);
      console.log('in', response);
      const posterID = response.data.posters.findIndex(option => option.height === 400);
      console.log('index', posterID);
      const PosterURL = response.data.posters.filter(posterID);
      console.log('posterURL', PosterURL);

      return PosterURL;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

test = new FilmotekaAPI();
const arr = test.searchMovie('LEAD', 2);
console.log('out', arr);

// async getReview(movie_id) {
//   try {
//     const response = await axios.get(`movie/${movie_id}/reviews?api_key=${this._apiKey}`);
//     return response.data;
//   } catch (error) {
//     throw new Error(error.message);
//   }
// }
