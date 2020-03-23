/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    let sidebarBtn = Array.from(document.getElementsByClassName('sidebar-toggle'));
    let body = Array.from(document.getElementsByTagName('body'));
    sidebarBtn.forEach(e => {
      e.addEventListener('click', function (){
        body[0].classList.toggle('sidebar-open');
        body[0].classList.toggle('sidebar-collapse');
      })
  })
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {

    let registration = Array.from(document.getElementsByClassName('menu-item_register'));
    let enter = Array.from(document.getElementsByClassName('menu-item_login'));
    let logout = Array.from(document.getElementsByClassName('menu-item_logout'));

    registration.forEach(element => {
      element.addEventListener('click', e => {
        App.getModal('register').open();
      })
    });

    enter.forEach(element => {
      element.addEventListener('click', e => {
        App.getModal('login').open();
      })
    });

    logout.forEach(element => {
      element.addEventListener('click', e => {
        User.logout({}, (err, response) => {
          if (response.success) {
            App.setState('init');
          }
        })         
      })
    });
    
  }

}
