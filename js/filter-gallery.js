/* eslint-disable no-shadow */
import { showMiniatures } from './adding-posts';
import { debounce, compareComments } from './util.js';

const imageFiltersButtons = document.querySelectorAll('.img-filters__button');
const pictures = document.querySelector('.pictures');
const filtersContainer = document.querySelector('.img-filters');

// Функция для удаления миниатюр (только изображений)
const removeMiniatures = () => {
  const images = pictures.querySelectorAll('.picture'); // Селектор для миниатюр
  images.forEach((image) => {
    image.remove(); // Удаляем только миниатюры
  });
};

// Функция для показа контейнера с фильтрами
export const showFiltersContainer = () => {
  filtersContainer.classList.remove('img-filters--inactive');
};

// Функция для скрытия контейнера с фильтрами
const hideFiltersContainer = () => {
  filtersContainer.classList.add('img-filters--inactive');
};

// Функция для обработки изменения фильтров
function onFiltersChange(filter) {
  imageFiltersButtons.forEach((button) => {
    button.classList.remove('img-filters__button--active');
  });
  filter.classList.add('img-filters__button--active');
  return filter.id;
}

// Функция для получения 10 случайных фотографий
const getRandomPictures = (picturesArray, count) => {
  // Перемешиваем массив
  const shuffled = [...picturesArray].sort(() => Math.random() - 0.5);
  // Возвращаем только первые 'count' элементов
  return shuffled.slice(0, count);
};

// Основная функция сортировки картинок с использованием debounce
export const sortPictures = (initialPictures, cb) => {

  const sortPicturesDebounce = debounce((filter) => {

    removeMiniatures(); // Удаляем только миниатюры

    let currentPictures = [...initialPictures]; // Копия массива для работы

    switch (filter) {
      case 'filter-random':
        currentPictures = getRandomPictures(currentPictures, 10);
        break;
      case 'filter-discussed':
        currentPictures = currentPictures.sort(compareComments); // Сортировка по количеству комментариев
        break;
      default:
        break; // По умолчанию, как есть
    }

    showMiniatures(currentPictures, cb); // Отображение миниатюр с callback'ом
  }, 500); // Дебаунсинг: не чаще чем 500 мс

  // Обработчик кликов на кнопки фильтров
  imageFiltersButtons.forEach((currentButton) => {
    currentButton.addEventListener('click', () => {
      const filterType = onFiltersChange(currentButton); // Получаем id фильтра
      sortPicturesDebounce(filterType); // Применяем фильтр с дебаунсом
    });
  });
};

// Пример обработки данных с сервера (когда данные получены, показываем фильтры)
export function onDataReceived() {
  hideFiltersContainer(); // Скрываем фильтры до получения данных
  showFiltersContainer(); // Показываем фильтры после получения данных
}
