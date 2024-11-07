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

const DESCRIPTION = [
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

const ID_PHOTO_COUNT = 25;

const ADDRESS_PHOTO_COUNT = 25;

const POST_QUANTITY = 25;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a,b));
  const upper = Math.floor(Math.max(a,b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

function getUniqueId (POST_QUANTITY) {
  let result = [];
  for(i = 1; i <= POST_QUANTITY; i++){
    result.push(generatePost(i));
  }
  return result;
}

const createCommentId = () => {
  let currentId = 0;
  return () => ++currentId
}
const commentId = createCommentId();

function generatePost(id) {
  return{
  id: id,
  url: `photos/${id}.jpg`,
  description: getRandomArrayElement(DESCRIPTION),
  likes: getRandomInteger(15, 200),
  comments: generateComments(),
  };
};

function generatePosts() {
  const result = [];
  for (let i = 1; i <= 25; i++) {
    result.push(generatePost(i));
  }
  return result;
}

function generateComments(){
  return {
    id: commentId(),
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: getRandomArrayElement(MESSAGES),
    name: getRandomArrayElement(NAMES),
  }
}

console.log(generatePosts());
