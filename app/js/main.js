let overlayMenu = (function (options) {
  let buttonOpen = document.querySelector(options.buttonOpen);
  let buttonClose = document.querySelector(options.buttonClose);
  let menu = document.querySelector(options.menu);
  let body = document.querySelector('body');

  let _toggleMenu = function(e) {
    menu.classList.toggle('overlay--show');
    body.classList.toggle('body--overlay-menu');
  }

  let addListeners = function() {
    buttonOpen.addEventListener('click', _toggleMenu);
    buttonClose.addEventListener('click', _toggleMenu);

    menu.addEventListener ('click', function(e) {
      target = e.target;
      if (target.classList.contains('menu__link')) {
        _toggleMenu();
      }
    });
  }


  return {
    open: addListeners
  };
}) ({
  buttonOpen: '#open',
  buttonClose: '#close',
  menu: '#overlay'
});

overlayMenu.open();

console.log(overlayMenu)