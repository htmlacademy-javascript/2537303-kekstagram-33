import { showBigPicture } from './big-pictures.js';

const photoTemplateElement = document.querySelector('#picture').content.querySelector('.picture');
export const photosContainer = document.querySelector('.pictures');

const generatePhotoElement = (photoData) => {
  const photoElement = photoTemplateElement.cloneNode(true);
  photoElement.querySelector('.picture__img').src = photoData.url;
  photoElement.querySelector('.picture__img').alt = photoData.description;
  photoElement.querySelector('.picture__likes').textContent = photoData.likes;
  photoElement.querySelector('.picture__comments').textContent = photoData.comments.length;

  photoElement.addEventListener('click', () => {
    showBigPicture(photoData);
  });

  return photoElement;
};

const showMiniatures = (photoData) => {
  const photosFragment = document.createDocumentFragment();
  photoData.forEach((photo) => {
    const photoElement = generatePhotoElement(photo);
    photosFragment.appendChild(photoElement);
  });
  photosContainer.appendChild(photosFragment);
};


export { showMiniatures };
