import axios from 'axios';

axios.defaults.baseURL = `https://api.themoviedb.org/3/`;

const API_KEY = '6c57fb02719926393bb8c06aa147886f';
const LANGUAGE = 'en-US';

export default class FilmotekaAPI {

  async getMostPopular(page = 1, timeWeek) {
    try {
      const reqURL = `trending/movie/${timeWeek ? 'week' : 'day'}?api_key=${API_KEY}&page=${page}&language=${LANGUAGE}`;
      const response = await axios.get(reqURL);

      if (!this.genres) {
        await this.getGenres();
      }
      return {
        page: response.data.page,
        totalPages: response.data.total_pages,
        totalResults: response.data.total_results,
        results: response.data.results.map(element => {
          return {
            title: element.title,
            about: element.overview,
            release: element.release_date,
            voteAverage: element.vote_average,
            voteCount: element.vote_count,
            popularity: element.popularity,
            id: element.id,
            genres: element.genre_ids.map(id => this.getGenre(id)),
            poster: element.poster_path ? `https://image.tmdb.org/t/p/original${element.poster_path}` : null,
          };
        }),
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async searchMovie(query, page = 1) {
    try {
      this.query = query;
      const response = await axios.get(
        `search/movie?api_key=${API_KEY}&query=${this.query}&page=${page}&include_adult=false`,
      );
      if (!this.genres) {
        await this.getGenres();
      }
      return {
        page: response.data.page,
        totalPages: response.data.total_pages,
        totalResults: response.data.total_results,
        results: response.data.results.map(element => {
          return {
            title: element.title,
            about: element.overview,
            release: element.release_date,
            voteAverage: element.vote_average,
            voteCount: element.vote_count,
            popularity: element.popularity,
            id: element.id,
            genres: element.genre_ids.map(id => this.getGenre(id)),
            poster: element.poster_path ? `https://image.tmdb.org/t/p/original${element.poster_path}` : null,
          };
        }),
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getFilmInfo(movie_id) {
    try {
      const data = await axios.get(
        `movie/${movie_id}?api_key=${API_KEY}&language=${LANGUAGE}`,
      ).then(res => res.data);

      return {
        title: data.title,
        about: data.overview,
        genres: data.genres.map(genre => genre.name),
        release: data.release_date,
        poster: data.poster_path ? `https://image.tmdb.org/t/p/original${data.poster_path}` : null,
        voteAverage: data.vote_average,
        voteCount: data.vote_count,
        popularity: data.popularity,
        id: movie_id,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getVideo(movie_id) {
    try {
      if (movie_id) {
        this.movie_id = movie_id;
      }
      const response = await axios.get(
        `movie/${this.movie_id}/videos?api_key=${API_KEY}&language=${LANGUAGE}`,
      );
      const videoID = response.data.results.map(result => result.key).slice(0, 1);
      return `https://www.youtube.com/embed/${videoID}`;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  findClosest(x, arr) {
    var indexArr = arr.map(function(k) {
      return Math.abs(k - x);
    });
    var min = Math.min.apply(Math, indexArr);
    return indexArr.indexOf(min);
  }

  async getPoster(movie_id, posterWidth = 500) {
    try {
      const response = await axios.get(`movie/${movie_id}/images?api_key=${API_KEY}`);
      console.log(response);
      const posterArrWidth = response.data.posters.map(poster => poster.width);
      const posterID = this.findClosest(posterWidth, posterArrWidth);
      const PosterURL = response.data.posters[posterID].file_path;
      return `https://image.tmdb.org/t/p/original${PosterURL}`;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getGenres() {
    if (this.genres) {
      return Promise.resolve(this.genres);
    }
    try {
      const response = await axios.get(
        `genre/movie/list?api_key=${API_KEY}&language=${LANGUAGE}`,
      );
      this.genres = response.data.genres;
      return this.genres;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  getGenre = (id) => {
    return this.genres.find((element) => element.id === id).name || '';
  };
}



