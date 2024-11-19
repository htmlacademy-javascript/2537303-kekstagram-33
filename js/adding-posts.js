import { generatePosts } from './data.js';

const postContainer = document.querySelector('.pictures');
const postTemplate = document.querySelector('#picture').content.querySelector('.picture');
const newPost = generatePosts();

const storageNewPost = document.createDocumentFragment();

newPost.forEach(({url, description, likes, comments}) => {
  const newPostTemplate = postTemplate.cloneNode(true);
  newPostTemplate.querySelector('.picture__img').src = url;
  newPostTemplate.querySelector('.picture__img').alt = description;
  newPostTemplate.querySelector('.picture__comments').textContent = comments.length;
  newPostTemplate.querySelector('.picture__likes').textContent = likes;
  storageNewPost.appendChild(newPostTemplate);
});

postContainer.appendChild(storageNewPost);
