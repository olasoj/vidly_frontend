import http from './httpService';
import config from '../config.json';

//Movie url
const apiUrl = '/movies';
function getMovieURL(id) {
  return apiUrl + '/' + id;
}

//get the movies data
const movies = async () => {
  try {
    const { data: movies } = await http.get(apiUrl);
    return movies;
  } catch (err) {
    if (err.response && err.response.status === 404) return alert('not found');
  }
};

//return the movies data
export const getMovies = async () => {
  return movies();
};

//Get a movie
export function getMovie(id) {
  return http.get(getMovieURL(id));
}

//create or update a movie
export async function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return await http.put(getMovieURL(movie._id), body, config.header);
  }

  return await http.post(apiUrl, movie, config.header);
}

export function deleteMovie(id) {
  return http.delete(getMovieURL(id));
}
