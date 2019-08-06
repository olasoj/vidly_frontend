import http from './httpService';
import config from '../config.json';

//get the url for users

const apiUrl = '/users';

export async function register(user) {
  return await http.post(
    apiUrl,
    {
      email: user.username,
      password: user.password,
      name: user.name
    },
    config.header
  );
}

// export function deleteMovie(id) {
//   return http.delete(getMovieURL(id));
// }
