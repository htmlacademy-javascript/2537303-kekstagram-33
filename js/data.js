import {getRandomArrayElement,getRandomInteger} from './util.js';
const NAMES = [
  'Дмитрий',
  'Антон',
  'Сергей',
  'Виктор',
  'Александр',
  'Евгений',
  'Анастасия',
  'Валерия',
  'Ксения',
  'Виктория',
  'Варвара',
  'Екатерина',
];

const DESCRIPTIONS = [
  'Закат над морем',
  'Лесная прогулка',
  'Городская архитектура',
  'Семейный пикник',
  'Зимний пейзаж',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const numbersLike = {
  min: 25,
  max: 200,
};

const avatarId = {
  min: 1,
  max: 6,
};

const commentsQuantity = {
  min: 1,
  max: 30,
};
const POST_QUANTITY = 25;

const createCommentId = () => {
  let currentId = 0;
  return () => ++currentId;
};
const commentId = createCommentId();

function generatePost(id) {
  return{
    id: id,
    url: `photos/${id}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(numbersLike.min, numbersLike.max),
    comments: generateComments(),
  };
}

function generatePosts() {
  const result = [];
  for (let i = 1; i <= POST_QUANTITY; i++) {
    result.push(generatePost(i));
  }
  return result;
}

function generateComment(){
  return {
    id: commentId(),
    avatar: `img/avatar-${getRandomInteger(avatarId.min, avatarId.max)}.svg`,
    message: getRandomArrayElement(MESSAGES),
    name: getRandomArrayElement(NAMES),
  };
}

function generateComments() {
  const result = [];
  const max = getRandomInteger(commentsQuantity.min, commentsQuantity.max);

  for (let i = 0; i <= max; i++) {
    result.push(generateComment());
  }
  return result;
}


generatePosts();
export {generatePosts};
