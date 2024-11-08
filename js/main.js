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
const POST_QUANTITY = 25;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a,b));
  const upper = Math.floor(Math.max(a,b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

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

function generateComments(){
  return {
    id: commentId(),
    avatar: `img/avatar-${getRandomInteger(avatarId.min, avatarId.max)}.svg`,
    message: getRandomArrayElement(MESSAGES),
    name: getRandomArrayElement(NAMES),
  };
}

generatePosts();
