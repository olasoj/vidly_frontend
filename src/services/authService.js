import http from './httpService';
import config from '../config.json';
import jwtDecode from 'jwt-decode';

http.setJwt(getJwt());

//get the url for users
const apiUrl = '/auth';

const tokenKey = 'token';

export async function login(email, password) {
  const { data: jwt } = await http.post(
    apiUrl,
    { email, password },
    config.header
  );
  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (err) {
    return null;
  }
}
export function getJwt() {
  try {
    return localStorage.getItem(tokenKey);
  } catch (err) {
    return null;
  }
}

export function checkIfIsAdmin() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    const user = jwtDecode(jwt);
    return user.isAdmin;
  } catch (err) {
    return null;
  }
}

export default {
  login,
  logout,
  getCurrentUser,
  loginWithJwt,
  getJwt,
  checkIfIsAdmin
};

// export function deleteMovie(id) {
//   return http.delete(getMovieURL(id));
// }
