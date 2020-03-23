/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */
class TransactionsWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if (element) {
		this.element = element;
		this.registerEvents();	
    } else{
      throw new Error('Ошибка');
    }
    
		
  }
  /**
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * экземпляра окна
   * */
  registerEvents() {

    let buttonIncome = this.element.querySelector('.create-income-button');
    let buttonExpense = this.element.querySelector('.create-expense-button');

    buttonIncome.addEventListener("click", function () {
      App.getModal('newIncome').open();
    });

    buttonExpense.addEventListener("click", function () {
      App.getModal('newExpense').open();
    });
  }

}
