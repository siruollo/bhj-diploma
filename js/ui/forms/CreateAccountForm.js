/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * Наследуется от AsyncForm
 * */
class CreateAccountForm extends AsyncForm{
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно (в котором находится форма) в случае успеха,
   * а также вызывает App.update()
   * и сбрасывает форму
   * */
  onSubmit( options ) {
    console.log(`Сработал onSubmit в CreateAccountForm`);
    console.log(options);
    console.log(`Данные переданные в Account.create в форме CreateAccountForm`);
    console.log(options.data);
    Account.create(options.data, (err, response) => {
      if (response.success) {
        App.getModal('createAccount').close();
        this.element.reset();
        App.update();
      } else {
        console.log(`Ошибка ${err}`);
      }
    })

  }
}

