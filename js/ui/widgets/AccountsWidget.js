/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */
class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if (element) {
      this.element = element;
      this.registerEvents();
      this.update();
    } else {
      throw new Error (`Передан пустой элемент`);
    }
    
  }

  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {
    // console.log(`Сработал registerEvents в AccountsWidgets`);
    this.element.addEventListener('click', (e) => {
      if (e.target.classList.contains('create-account')) {
        App.getModal('createAccount').open();
      }

      if (e.target.closest('.account')) {
        this.onSelectAccount(e.target.closest('.account'));
      }
    });

  }

  /**
   * Метод доступен только авторизованным пользователям
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода renderItem()
   * */
  update() {
    // console.log(User.current());
    if (User.current()) {
      Account.list(User.current(), (err, response) => {
        // console.log(response);
        if (response) {
          this.clear();
          for (let i = 0; i < response.data.length; i++) {
            this.renderItem(response.data[i]);
          } 
        } else {
          console.log('Ошибка обновления счетов');
        }
      });
    }
  }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
    let accounts = document.querySelectorAll('.account');
    for (let item of accounts) {
      item.remove();
    }

  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount( element ) {

  let account = document.querySelector('.active');
  // console.log(account);
  if (account) {
    account.classList.remove('active');
  }
  this.currentAccountId = null;

  element.classList.add('active');
  this.currentAccountId = element.dataset.id;
  App.showPage('transactions', { account_id: this.currentAccountId });

  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML( item ) {

    let output = `<li class="account" data-id="${item.id}">
                    <a href="#">
                        <span>${item.name}</span> /
                        <span>${item.sum}</span>
                    </a>
                  </li>`

return output;
  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem( item ) {

    let accountInfo = this.getAccountHTML(item);
    this.element.insertAdjacentHTML('beforeEnd', accountInfo);

  }
}






