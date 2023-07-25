import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';

const selectEl = document.querySelector('.breed-select');
const catInfoEl = document.querySelector('.cat-info');
const errorTextEl = document.querySelector('.error');
const loadTextEl = document.querySelector('.p-loader');

toggleHidden(errorTextEl);
toggleHidden(loadTextEl);
toggleHidden(selectEl);

window.addEventListener('load', onLoad);
selectEl.addEventListener('change', addCatInfo);

function onLoad() {
  toggleHidden(loadTextEl);
  fetchBreeds('breeds')
    .then(resp => {
      toggleHidden(selectEl);
      addSelect(resp);
    })
    .catch(error => {
      Notiflix.Notify.failure(errorTextEl.textContent);
    })
    .finally(() => {
      toggleHidden(loadTextEl);
    });
}

function addCatInfo(evt) {
  toggleHidden(loadTextEl);
  breedId = evt.target.value;
  fetchCatByBreed(breedId)
    .then(resp => {
      addCatInfoMarcup(resp);
    })
    .catch(error => {
      Notiflix.Notify.failure(errorTextEl.textContent);
    })
    .finally(() => {
      toggleHidden(loadTextEl);
    });
}

function addSelect(resp) {
  const catBreds = resp
    .map(({ name, id }) => `<option value='${id}'>${name}</option>`)
    .join('');
  selectEl.insertAdjacentHTML('beforeend', catBreds);
  new SlimSelect({
    select: selectEl,
    settings: {
      showSearch: false,
    },
  });
}

function addCatInfoMarcup(resp) {
  const catInfoMarcup = resp
    .map(
      ({
        url,
        breeds,
      }) => `<img src="${url}" alt="${breeds[0].name}" width="500">
    <h2>${breeds[0].name}</h2>
  <p>${breeds[0].description}</p>
  <h3>Temperament</h3>
  <p>${breeds[0].temperament}</p>`
    )
    .join('');
  catInfoEl.innerHTML = catInfoMarcup;
}

function toggleHidden(el) {
  el.classList.toggle('is-hidden');
}
