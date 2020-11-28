import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

function OpenImage(event) {
  if (event.target.nodeName !== 'IMG') {
    return;
  }

  event.preventDefault();
  const imageToShow = `<img src= ${event.target.dataset.source}>`;
  console.log(imageToShow);
  const instance = basicLightbox.create(imageToShow);
  instance.show();
}

export { OpenImage };