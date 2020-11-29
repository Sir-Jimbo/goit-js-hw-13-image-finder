import './css/styles.css';
import getRefs from './js/components/get-refs';
import ApiService from './js/components/apiService';
import imagesTpl from './templates/gallery.hbs';
import LoadMoreBtn from './js/components/load-more-btn';
import { OpenImage } from './js/components/lightBox';
const debounce = require('lodash.debounce');
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import pnotify from './js/components/pnotify-error';

 //import './js/components/infinityScroll.js';
 //import './js/components/observerScroll.js';

const refs = getRefs();

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

refs.searchForm.addEventListener('submit', onSearch);
refs.imagesContainer.addEventListener('click', OpenImage);
loadMoreBtn.refs.button.addEventListener('click', fetchImages);

const apiService = new ApiService();

let currentCoord = 0;

function onSearch(e) {
    e.preventDefault();

    apiService.query = e.currentTarget.elements.query.value;
     try {
         if (apiService.query === '') {
             clearImagesContainer();
             loadMoreBtn.hide();
             return alert('Упс...поле не может быть пустым');
         }
    
    apiService.resetPage();
    clearImagesContainer();
    fetchImages();
    
    }
     
     catch (error) {
        console.log(error);
    }
}

function fetchImages() {
    currentCoord = refs.imagesContainer.offsetHeight;

    try {
        
        loadMoreBtn.show();
        loadMoreBtn.disable();
        
        apiService.fetchImages().then(hits => {
            appendImagesMarkup(hits);
            loadMoreBtn.enable();
            scrollingPage();
            searchError(hits);
        });
    }
    catch (error) {
        console.log(error);
    }
}

function appendImagesMarkup(hits) {
  refs.imagesContainer.insertAdjacentHTML('beforeend', imagesTpl(hits));
}

function clearImagesContainer() {
  refs.imagesContainer.innerHTML = '';
}

function scrollingPage() {
    try {
        window.scrollTo({
            top: currentCoord,
            left: 0,
            behavior: 'smooth',
        });
    } catch (error) {
        console.log(error);
        console.log('Не удалось загрузить скроллинг страницы найденных изображений');
    }
}

function searchError(hits) {
    try {
        const numberOfImages = hits.length;
        if (numberOfImages === 0) {
            pnotify.Error();
            loadMoreBtn.hide();
        }
    } catch (error) {
        console.log(error);
        console.log("Не удалось загрузить pnotify-ошибку при поиске изображений");
    }
}
/*
const onEntry = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && apiService.query !== '') {
      apiService.fetchImages().then(hits => {
        appendImagesMarkup(hits);
        apiService.incrementPage();
      });
    }
  });
};

const observer = new IntersectionObserver(onEntry, {
  rootMargin: '150px',
});
observer.observe(refs.sentinel);
*/