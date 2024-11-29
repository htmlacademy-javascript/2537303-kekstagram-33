import { isEscapeKey } from './util';

const MAX_QUANTITY_HASHTAGS = 5;
const MAX_SIZE_COMMENTS = 140;
const HASHTAG_STRING = /^#[a-zа-яё0-9]{1,19}$/i;

const errorMessage = {
  INVALID_HASHTAG: 'Введен невалидный хэштег',
  QUANTITY_EXCEEDED_HASHTAG: 'Превышено количество хэштегов',
  REPEAT_HASHTAGS: 'Хэштеги не должны повторяться',
  SIZE_COMMENT_EXCEEDED: 'Превышен размер комментария'
};

const uploadForm = document.querySelector('.img-upload__form');
const hashtagsInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');

hashtagsInput.addEventListener('keydown', (evt) =>{
  if(isEscapeKey){
    evt.stopPropagation();
  }
});

descriptionInput.addEventListener('keydown', (evt) =>{
  if(isEscapeKey){
    evt.stopPropagation();
  }
});

const pristine = new Pristine(uploadForm,{
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error'
});

const resetPristine = () => {
  pristine.reset();
};

const checkSizeDescription = (element) => element.length <= MAX_SIZE_COMMENTS;

const splitsTheEnteredData = (element) => {
  const hashtags = element.trim().split(/\s+/);
  return hashtags;
};

const checkSizeHashtags = (element) => splitsTheEnteredData(element).length <= MAX_QUANTITY_HASHTAGS;

const checkValidHashtag = (element) => {
  const hashtag = splitsTheEnteredData(element);
  return HASHTAG_STRING.test(hashtag);
};

const checkUniquenessHashtag = (element) => {
  const hashtag = splitsTheEnteredData(element);
  const uniquenessHashtags = new Set(hashtag);
  return uniquenessHashtags.size === hashtag.length;
};

const validationHashtag = (element) => {
  checkUniquenessHashtag(element);
  checkSizeHashtags(element);
  checkValidHashtag(element);
};

const validationDescription = (element) => {
  checkSizeHashtags(element);
};

pristine.addValidator(hashtagsInput, checkSizeHashtags, errorMessage.QUANTITY_EXCEEDED_HASHTAG);
pristine.addValidator(descriptionInput, checkSizeDescription, errorMessage.SIZE_COMMENT_EXCEEDED);
pristine.addValidator(hashtagsInput, checkUniquenessHashtag, errorMessage.REPEAT_HASHTAGS);
pristine.addValidator(hashtagsInput, checkValidHashtag, errorMessage.INVALID_HASHTAG);

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    uploadForm.submit();
  }
});

export {descriptionInput, hashtagsInput, validationHashtag, validationDescription, uploadForm, resetPristine};
