/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
import { closeUploadPhotoOverlay } from "./image-upload-module";
import { isEscapeKey } from './util.js';

const messageContainer = document.createElement('div');
const errorTemplate = document.querySelector('#error').content;
const successTemplate = document.querySelector('#success').content;
const submitButton = document.querySelector('#upload-submit');
const dataErrorTemplate = document.querySelector('#data-error').content;

const SubmitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};

export const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

export const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

let isErrorMessageShown = false;

const closeMessage = () => {
  messageContainer.remove();
  document.removeEventListener('keydown', onDocumentEscPress);
  isErrorMessageShown = false;
};

const onDocumentEscPress = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMessage();
  }
};

const closeMessageIfOutsideInner = (evt) => {
  const inner = evt.target.closest('.success__inner');
  if (!inner) {
    closeMessage();
  }
};

export const handleSuccess = (data) => {
  messageContainer.innerHTML = '';
  const successMessage = successTemplate.cloneNode(true);
  const successButton = successMessage.querySelector('.success__button');
  const successSection = successMessage.querySelector('.success');
  closeUploadPhotoOverlay();

  successButton.addEventListener('click', closeMessage);
  successSection.addEventListener('click', closeMessageIfOutsideInner);
  messageContainer.appendChild(successMessage);
  document.body.appendChild(messageContainer);
  document.addEventListener('keydown', onDocumentEscPress);
  console.log('Успешная отправка данных:', data);
};

const closeMessageIfOutsideErrorInner = (evt) => {
  const inner = evt.target.closest('.error__inner');
  if (!inner) {
    closeMessage();
  }
};

export const handleError = (error) => {
  messageContainer.innerHTML = '';
  const errorMessage = errorTemplate.cloneNode(true);
  const errorButton = errorMessage.querySelector('.error__button');
  const errorSection = errorMessage.querySelector('.error');
  const errorInner = errorMessage.querySelector('.error__inner');

  errorButton.addEventListener('click', closeMessage);
  if(errorInner) {
    errorSection.addEventListener('click', closeMessageIfOutsideErrorInner);
  }
  messageContainer.appendChild(errorMessage);
  document.body.appendChild(messageContainer);
  document.addEventListener('keydown', onDocumentEscPress);
  isErrorMessageShown = true;
  console.error('Произошла ошибка:', error);
};

export const getDataError = (error) => {
  const errorMessage = dataErrorTemplate.cloneNode(true);
  messageContainer.appendChild(errorMessage);
  document.body.appendChild(messageContainer);
  console.error('Ошибка загрузки данных c сервера:', error);
};

export { isErrorMessageShown };
