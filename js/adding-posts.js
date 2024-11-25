import { generatePosts } from './data.js';
import { showBigPicture } from './big-pictures.js'

const postContainer = document.querySelector('.pictures');
const postTemplate = document.querySelector('#picture').content.querySelector('.picture');
const newPosts = generatePosts();

const showMiniatures = () => {

const storageNewPost = document.createDocumentFragment();

newPosts.forEach((newPost) => {
  const newPostTemplate = postTemplate.cloneNode(true);
  newPostTemplate.dataset.id = newPost.id;
  newPostTemplate.querySelector('.picture__img').src = newPost.url;
  newPostTemplate.querySelector('.picture__img').alt = newPost.description;
  newPostTemplate.querySelector('.picture__comments').textContent = newPost.comments.length;
  newPostTemplate.querySelector('.picture__likes').textContent = newPost.likes;
  storageNewPost.appendChild(newPostTemplate);
});

postContainer.appendChild(storageNewPost);
};

const onSmallPhotoClick = (evt) => {
  if(evt.target.matches('.picture__img')){
    const photoClick = evt.target.closest('.picture');

    if(photoClick){
      const photoId = parseInt(photoClick.dataset.id, 10);
      const photo = newPosts.find((element) => element.id === photoId);
      if(typeof photo != 'underfined'){
        showBigPicture(photo);
      }
    }
  }
}

postContainer.addEventListener('click', onSmallPhotoClick);

export {showMiniatures};
