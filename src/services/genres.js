import http from './httpService';

const gernes = async () => {
  try {
    const { data: genres } = await http.get('/genres');
    return genres;
  } catch (err) {
    if (err.response && err.response.status === 404) return alert('not found');
  }
};

export function getGenres() {
  return gernes();
}
