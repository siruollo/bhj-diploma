/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * Наследуется от AsyncForm
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor( element ) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    let accountList = document.querySelectorAll('.accounts-select');

    Account.list(User.current(), (err, response) => {
      for (let item of accountList) {
        item.innerHTML = "";
      }

      if (response) {
        for (let i = 0; i < response.data.length; i++) {
          let account = `<option value="${response.data[i].id}">${response.data[i].name}</option>`;
          for (let item of accountList)
          item.insertAdjacentHTML("beforeEnd", account);
        }
      } else {
        console.log(`Ошибка ${err}`);
      }
    });



  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit( options ) {

    Transaction.create(options.data, (err, response) => {
      if (response) {
        this.element.reset();
        let type = options.data.type;
        let windowName = 'new' + type[0].toUpperCase() + type.slice(1);
        App.getModal(windowName).close();
        App.update();
      }
    });





  }
}
