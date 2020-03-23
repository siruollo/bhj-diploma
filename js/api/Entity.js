/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * Имеет свойство HOST, равно 'https://bhj-diplom.letsdocode.ru'.
 * */
class Entity {

  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */
  static list( data, callback = f => f ) {
    let options = {
      data: data,
      url: this.HOST + this.URL,
      responseType: 'json',
      method: 'GET',
      callback
    }
    // console.log(options)
    return createRequest(options);
  }

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create( data, callback = f => f ) {
    // console.log(`Сработал create в Entity`);
    // console.log(data);
    Object.assign(data, {_method: 'PUT'});

    let options = {
      data,
      url: this.HOST + this.URL,
      responseType: 'json',
      method: 'POST',
      callback
    };

    return createRequest(options);

  }

  /**
   * Получает информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static get( id, data, callback = f => f ) {  

    Object.assign(data, {id: id });

    let options = {
      data,
      url: this.HOST + this.URL,
      responseType: 'json',
      method: 'GET',
      callback
    };

    return createRequest(options);

  }

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove( id, data, callback = f => f ) {
    console.log(id);
    console.log(data);
    data = {[id]: data };
    // Object.assign(data, {id: id });
    console.log(data);
    data = Object.assign(data, {_method: 'DELETE'});

    let options = {
      data,
      url: this.HOST + this.URL,
      responseType: 'json',
      method: 'POST',
      callback
    };
    console.log(options);
    return createRequest(options);

  }
}

Entity.URL = '';
Entity.HOST = 'https://bhj-diplom.letsdocode.ru';

    // let x = {
    //   d: 1
    // }
    
    // let y = 'sdf';
    
    // Object.assign(x, {t: 2});
    // Object.assign(x, {y: y});
    // console.log(x);