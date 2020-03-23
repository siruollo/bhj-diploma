/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = options => {
  // console.log(`Входные данные в createRequest`);
  // console.log(options);
  let xhr = new XMLHttpRequest;
  xhr.withCredentials = true;
  xhr.responseType = options.responseType;
  let formData = new FormData();

  
  if (options.method === 'GET') {
    if (options.data) {
      options.url += '?';
      for (let item in options.data) {
          options.url += `${item}=${options.data[item]}&`
        }
      // console.log(options.url);
      options.url = options.url.slice(0, -1);
      // console.log(options.url);
    }
  } else {
    for (let item in options.data) {
      formData.append(item, options.data[item]);
    }
  }

  if (options.headers !== undefined) {
    for (let item in options.headers) {
        xhr.setRequestHeader(item, options.headers[item]);
    } 
  }

  xhr.open(options.method, options.url);

  xhr.onerror = function() {
    options.callback(new Error(`Не удалось загрузить данные${xhr.status}`), 0);
  };

  xhr.onload = function () {
    if (xhr.readyState === xhr.DONE && xhr.status === 200) {
      // console.log(`Запрос createRequest onload`);
      console.log(xhr);
      try {
        options.callback(0, xhr.response);
      }
      catch (err) {
        options.callback(err, 0);
      }
      // return xhr;
    }
  }

  if (options.method === 'GET') {
    xhr.send();
  } else {
    xhr.send(formData);
  };
  // console.log(`Ответ в createRequest`);
  console.log(xhr);
  return xhr;

};