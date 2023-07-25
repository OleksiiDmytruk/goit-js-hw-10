const BASE_URL = 'https://api.thecatapi.com/v1/';
const API_KEY =
  'live_5m5iCi0ss4sg5J3v6GvJnhG0w0oGl7iezVHE6YlrA2gkO67kZZg2JDFdQ53bbLcO';

export function fetchBreeds(endpoint) {
  return fetch(`${BASE_URL}${endpoint}?api_key=${API_KEY}`).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
}

export function fetchCatByBreed(breedId) {
  return fetch(
    `${BASE_URL}images/search?breed_ids=${breedId}&api_key=${API_KEY}`
  ).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
}
