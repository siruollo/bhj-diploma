/**
 * Класс AsyncForm управляет всеми формами
 * приложения, которые не должны быть отправлены с
 * перезагрузкой страницы. Вместо этого данные
 * с таких форм собираются и передаются в метод onSubmit
 * для последующей обработки
 * */
class AsyncForm {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor( element ) {
    if (!element) {
      throw new Error(`Передан пустой элемент`)
    }
    this.element = element;
    this.registerEvents();
  }

  /**
   * Необходимо запретить отправку формы. В момент отправки
   * вызывает метод submit()
   * */
  registerEvents() {
    this.element.addEventListener("submit", e => {
      e.preventDefault();
      this.submit();
    });
  }

  /**
   * Преобразует данные формы в объект вида
   * {
   *  'название поля формы 1': 'значение поля формы 1',
   *  'название поля формы 2': 'значение поля формы 2'
   * }
   * */
  getData() {

    let formData = new FormData(this.element);

    let entries = formData.entries();
    let output = {};
    for (let item of entries) {
        let key = item[0];
        let value = item[1];
        output[key] = value;
    }

    return output;


  }

  onSubmit( options ) {
    
  }

  /**
   * Вызывает метод onSubmit и передаёт туда
   * данные, полученные из метода getData()
   * */
  submit() {
    let output = {};
    output.method = this.element.getAttribute('method');
    output.url = this.element.getAttribute('action');
    output.data = this.getData();
    this.onSubmit(output);

  }

//   <form action="http://netology.ru" id="myform" method="POST">
//     <input type="hidden" name="hello" value="kitty">
//     <input type="hidden" name="city" value="New York">
//   </form>
// class MyForm extends AsyncForm {
//   onSubmit( options ) {
//     console.log( options ); // выведет данные, которые передаст onsubmit
//   }
// }

// const form = document.getElementById( 'myform' ),
//   asyncForm = new MyForm( form );

// asyncForm.submit();
// /*
//   Метод вызовет onSubmit, который выдаст такие данные
//   {
//     url: 'http://netology.ru',
//     method: 'POST',
//     data: {
//       hello: 'kitty',
//       city: 'New York'
//     }
//   }
// */</input>

}
