import { isEscapeKey } from './util.js';

const NUMBER_UPLOAD_COMMENTS = 5;

const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const bigPictureCaption = bigPicture.querySelector('.social__caption');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
const bigPictureComment = bigPicture.querySelector('.social__comment');
const bigPictureComments = bigPicture.querySelector('.social__comments');
const bigPictureCommentCount = bigPicture.querySelector('.social__comment-shown-count');
const bigPictureCommentTotalCount = bigPicture.querySelector('.social__comment-total-count');
const bigPictureCommentLoader = bigPicture.querySelector('.comments-loader');

let comment;
let displayedComments = 0;

const renderComments = () => {
  const storageNewComment = document.createDocumentFragment();

  for(let i = 0; i <= NUMBER_UPLOAD_COMMENTS - 1; i++){
    if(displayedComments < comment.length){
      const { avatar, message, name } = comment[displayedComments];
      const newCommentTemplate = bigPictureComment.cloneNode(true);
      newCommentTemplate.querySelector('.social__picture').src = avatar;
      newCommentTemplate.querySelector('.social__picture').alt = name;
      newCommentTemplate.querySelector('.social__text').textContent = message;
      storageNewComment.appendChild(newCommentTemplate);
      displayedComments++;

      if(displayedComments >= comment.length){
        bigPictureCommentLoader.classList.add('hidden');
      }
    }
    bigPictureCommentCount.textContent = displayedComments;
  }
  bigPictureComments.appendChild(storageNewComment);
};

const publishedComments = (photo) => {
  comment = photo.comments;
  renderComments();
  bigPictureCommentLoader.addEventListener('click', renderComments);
};

const renderBigPicture = (photo) => {
  bigPictureImage.src = photo.url;
  bigPictureLikes.textContent = photo.likes;
  bigPictureCommentTotalCount.textContent = photo.comments.length;
  bigPictureCaption.textContent = photo.description;
};

const onBigPictureKeydownEsc = (evt) => {
  if(isEscapeKey(evt)){
    evt.preventDefault();
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    displayedComments = 0;
  }
};

const onBigPictureKeydownEnter = (evt) => {
  if(isEscapeKey(evt)){
    evt.preventDefault();
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    displayedComments = 0;
  }
};

const closeBigPicture = () => {
  window.removeEventListener('keydown', onBigPictureKeydownEsc);
  bigPictureClose.removeEventListener('keydown', onBigPictureKeydownEnter);
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  displayedComments = 0;
};

const showBigPicture = (photo) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  window.addEventListener('keydown', onBigPictureKeydownEsc);
  bigPictureClose.addEventListener('keydown', onBigPictureKeydownEnter);
  bigPictureClose.addEventListener('click', closeBigPicture);
  renderBigPicture(photo);
  bigPictureComments.innerHTML = '';
  publishedComments(photo);
};

export {showBigPicture};
