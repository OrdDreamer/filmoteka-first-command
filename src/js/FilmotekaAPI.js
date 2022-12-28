import axios from 'axios';
axios.defaults.baseURL = `https://api.themoviedb.org/3/`;
const API_KEY = '6c57fb02719926393bb8c06aa147886f';

export default class FilmotekaAPI {






  //   constructor(apiKey) {
  //   this._apiKey = apiKey;
  // }
    // constructor({title, id, poster , vote, votes, popularity ,originalTitle, genre, about }) {

    // }

// якщо не передавати параметра повертає масив обєктів за день, якщо true за тиждень
    async getMostPopular(timeWeek)  {
        try {
          let searchTime = `trending/movie/day?api_key=${API_KEY}`;
          if (timeWeek) {searchTime = `trending/movie/week?api_key=${API_KEY}`} 
          const response = await axios.get(
            searchTime

          //   `popular?api_key=${API_KEY}`
          // );
          );
          return response.data;
        } catch (error) {
          throw new Error(error.message);
        }
      }


    // searchMovie(name){
    //     return `${this.URL} `

    // }
    // https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>


    // Пошук фільму за ключовим словом
    async searchMovie(query)  {
        try {
          const response = await axios.get(
            `search/movie?api_key=${API_KEY}&query=${query}`
          );
          return response.data;
        } catch (error) {
          throw new Error(error.message);
        }
      }


    
// Отримання повної інформації кінофільму за допомогою ID
    async getInfo(movie_id)  {
        try {
          const response = await axios.get(
`movie/${movie_id}?api_key=${API_KEY}`
          );
          return response.data;
        } catch (error) {
          throw new Error(error.message);
        }
      }


// Отримання відеомедіафайлу
async getVideo(movie_id)  {
  try {
    const response = await axios.get(
`movie/${movie_id}/videos?api_key=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

    
      async getReview(movie_id){
        try {
          const response = await axios.get(
            `movie/${movie_id}/reviews?api_key=${API_KEY}`
          );
          return response.data;
        } catch (error) {
          throw new Error(error.message);
        }


      }
   
}

test = new FilmotekaAPI;
const arr = test.getVideo(550)
console.log(arr)
