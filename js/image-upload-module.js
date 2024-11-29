import { isEscapeKey, isEnterKey } from './util';
import { descriptionInput, hashtagsInput, validationHashtag, validationDescription, uploadForm, resetPristine, onFormCancelKeydownEnter} from './validation-form';
//import { submitsForm } from './submitting-form'//

const uploadInput = document.querySelector('.img-upload__input');
const photoOverlay = document.querySelector('.img-upload__overlay');
const photoPreview = document.querySelector('.img-upload__preview img');
const photoCancel = document.querySelector('.img-upload__cancel');
//const photoForm = document.querySelector ('.img-upload__form');
const effectsItemPreview = document.querySelectorAll('.effects__item span');

const onPhotoOverlayKeydownEnter = (evt) => {
  if(isEnterKey(evt)){
    evt.preventDefault();
    photoOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
    photoPreview.src = '';
  }
};

const onPhotoOverlayKeydownEsc = (evt) => {
  if(isEscapeKey(evt)){
    evt.preventDefault();
    photoOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
    photoPreview.src = '';
  }
};

const uploadPhotoPreview = (evt) => {
  const file = evt.target.files[0];
  if (file) {
    const reader = new FileReader();

    reader.onload = () => {
      photoPreview.src = evt.target.result;
      effectsItemPreview.forEach((item) => {
        item.style.backgroundImage = `url('${evt.target.result}')`;
      });
    };

    reader.readAsDataURL(file);
  }
};

const closeUploadPhotoOverlay = () => {
  photoOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  window.removeEventListener('keydown', onPhotoOverlayKeydownEsc);
  photoPreview.src = '';
  uploadForm.reset();
  resetPristine();
  hashtagsInput.removeEventListener('keydown', onFormCancelKeydownEnter);
  descriptionInput.removeEventListener('keydown', onFormCancelKeydownEnter);
};

const openUploadPhotoOverlay = (evt) => {
  photoOverlay.classList.remove('hidden');
  photoOverlay.classList.add('modal-open');
  uploadPhotoPreview(evt);
  window.addEventListener('keydown', onPhotoOverlayKeydownEsc);
  photoCancel.addEventListener('click', closeUploadPhotoOverlay);
  photoCancel.addEventListener('keydown', onPhotoOverlayKeydownEnter);
  validationDescription(descriptionInput.value);
  validationHashtag(hashtagsInput.value);
  //photoForm.addEventListener('submit', submitsForm);//
};

const uploadPhoto = () => {
  uploadInput.addEventListener('change', openUploadPhotoOverlay);
};

export {uploadPhoto};
