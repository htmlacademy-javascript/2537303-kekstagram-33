import { isEscapeKey, isEnterKey } from './util';
import { initValidation, resetPristine } from './validation-form';
import { imageScaling } from './image-scaling-module';
import { reset } from './image-effect-module';
import { onDocumentEscPress, uploadForm, onSubmitData } from './validation-form';
//import { submitsForm } from './submitting-form'//

const uploadInput = document.querySelector('.img-upload__input');
const photoOverlay = document.querySelector('.img-upload__overlay');
const photoPreview = document.querySelector('.img-upload__preview img');
const photoCancel = document.querySelector('.img-upload__cancel');
const effectsItemPreview = document.querySelectorAll('.effects__item span');

const closingOverlay = () => {
  photoOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  photoPreview.src = '';
};

const onPhotoOverlayKeydownEnter = (evt) => {
  if(isEnterKey(evt)){
    evt.preventDefault();
    closingOverlay();
  }
};

const onPhotoOverlayKeydownEsc = (evt) => {
  if(isEscapeKey(evt)){
    evt.preventDefault();
    closingOverlay();
  }
};

const uploadPhotoPreview = (evt) => {
  const file = evt.target.files[0];
  if (file) {
    const objectURL = URL.createObjectURL(file);
    photoPreview.src = objectURL;
    effectsItemPreview.forEach((item) => {
    item.style.backgroundImage = `url('${objectURL}')`;
    });
  }
};

const closeUploadPhotoOverlay = () => {
  closingOverlay();
  window.removeEventListener('keydown', onPhotoOverlayKeydownEsc);
  resetPristine();
  reset();
};

const openUploadPhotoOverlay = (evt) => {
  photoOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  uploadPhotoPreview(evt);
  window.addEventListener('keydown', onPhotoOverlayKeydownEsc);
  photoCancel.addEventListener('click', closeUploadPhotoOverlay);
  photoCancel.addEventListener('keydown', onPhotoOverlayKeydownEnter);
  initValidation();
  imageScaling();
  uploadForm.addEventListener('submit', onSubmitData);
  document.addEventListener('keydown', onDocumentEscPress);
};

const uploadPhoto = () => {
  uploadInput.addEventListener('change', openUploadPhotoOverlay);
};

export {uploadPhoto, closeUploadPhotoOverlay, uploadPhotoPreview};
