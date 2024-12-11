const BASE_URL = 'https://32.javascript.htmlacademy.pro/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};
const Method = {
  GET: 'GET',
  POST: 'POST',
};

const ErrorText = {
  GET_DATA: 'При загрузке данных произошла ошибка',
  SEND_DATA: 'При отправке данных произошла ошибка',
};

const load = (route, errorText, method = Method.GET, body = null) => {
  const options = {
    method,
  };

  // Если передано тело запроса
  if (body) {
    if (body instanceof FormData) {
      options.body = body; // Если это FormData, отправляем напрямую
    } else {
      // Для обычных JSON запросов
      options.headers = {
        'Content-Type': 'application/json',
      };
      options.body = JSON.stringify(body); // Преобразуем тело запроса в JSON
    }
  }


  return fetch(`${BASE_URL}${route}`, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`); // Уточняем ошибку
      }
      return response.json();
    })
    .catch((error) => {
      console.error(error); // Логируем ошибку для отладки
      throw new Error(errorText);
    });
};

const sendDataWithFile = (formElement) => {
    const formData = new FormData(formElement);

  const options = {
    method: Method.POST,
    body: formData, // Передаем FormData с файлом
  };

  for (let [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
  };

  return fetch(`${BASE_URL}${Route.SEND_DATA}`, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error(error);
      throw new Error(ErrorText.SEND_DATA);
    });
};

const getData = () => load(Route.GET_DATA, ErrorText.GET_DATA);

const sendData = (body) => load(Route.SEND_DATA, ErrorText.SEND_DATA, Method.POST, body);

// Функция для отправки формы с файлом

export { getData, sendData, sendDataWithFile};
