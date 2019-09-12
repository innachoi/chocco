// Menu Overlay

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



// TEAM Accordion 

let teamAcco = () => {
  let teamList = document.querySelector('.team__list');

  teamList.addEventListener('click', e => {
    e.preventDefault();

    let target = e.target;

    const memberAcco = target.closest('.member__acco');
    const memberAccoList = document.querySelectorAll('.member__acco');

    if(target.className === 'member__name'){

      if(!memberAcco.classList.contains('member__acco--active')) {
        for(let i=0; i<memberAccoList.length; i++) {
          memberAccoList[i].classList.remove('member__acco--active');
        };
  
        memberAcco.classList.add('member__acco--active');
      } else {
       memberAcco.classList.remove('member__acco--active');
      }
    }
  })
};
teamAcco();

// MENU Accordion

let menuAcco = () => {
  let menuList = document.querySelector('.chocco-menu__list');

  menuList.addEventListener('click', e => {
    e.preventDefault();

    let target = e.target;
    console.log(target);

    const link = target.closest('.chocco-menu__link');
    const links = document.querySelectorAll('.chocco-menu__link');

    if(target.className === 'chocco-menu__link' || 'chocco-menu__name' ) {
      if(!link.classList.contains('menu-hidden--active')) {
        for(let i=0; i<links.length; i++) {
          links[i].classList.remove('menu-hidden--active');
        };
        link.classList.add('menu-hidden--active');
      } else {
        link.classList.remove('menu-hidden--active');
      }
    }
  })
}
menuAcco();


// SLIDER 

const choccoSlider = (function() {
  const slider = document.querySelector('.ingredients__slider');
  const arrowBack = document.querySelector('.arrow--back');
  const arrowFront = document.querySelector('.arrow--front');
  const computed = getComputedStyle(slider);

  let sliderWidth = parseInt(computed.width);

  window.addEventListener('resize', function() {
    currentRight = 0;
    slider.style.right = currentRight;
    sliderWidth = parseInt(computed.width);
  }, true);

  var sliderItemCounter = slider.children.length;

  let moveSlide = function(direction) {
    direction.addEventListener('click', function(e) {
      e.preventDefault();
      let currentRight = parseInt(computed.right);

      if(currentRight < (sliderItemCounter-1)*sliderWidth && direction==arrowFront) {
        slider.style.right = currentRight + sliderWidth + 'px';
      };

      if(currentRight > 0 && direction==arrowBack) {
        slider.style.right = currentRight - sliderWidth + 'px';
      }

      if(currentRight === (sliderItemCounter-1)*sliderWidth && direction==arrowFront) {
        slider.style.right = 0 + 'px';
      }

      if(currentRight == 0 && direction==arrowBack) {
        slider.style.right = 0 + sliderWidth + 'px';
      }
    });
  }
  let addListeners = function() {
    moveSlide(arrowBack);
    moveSlide(arrowFront);
  }
  return {init: addListeners};
})();

choccoSlider.init();


// Reviews

(function(){
  const items = document.querySelectorAll('.reviews__full-item');
  const icons = document.querySelectorAll('.reviews__item');
  let active = 0;

  for (let i = 0; i < items.length; i++) {
    icons[i].addEventListener('click', function(e) {
      e.preventDefault();
      items[i].classList.toggle('reviews__full-item--active');
      icons[i].classList.toggle('reviews__item--active');
     
      icons[active].classList.toggle('reviews__item--active');
      items[active].classList.toggle('reviews__full-item--active');
      active = i;     
    });
  }
})();


// Form

let form = () => {
  
  const formOrder = document.querySelector('.delivery__form');
  const orderBtn = document.querySelector('.form__btn');

  
  orderBtn.addEventListener('click', event => {
    event.preventDefault();
    
    if (validateForm(formOrder)) {
      const data = {
        name: formOrder.elements.name.value,
        phone: formOrder.elements.phone.value,
        comment: formOrder.elements.comment.value
      };
      
      
      var formData = new FormData(formOrder);

      formData.append("to", "choi.inna375@gmail.com");

      console.log(formData)

      const xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
      xhr.send(formData);
      xhr.addEventListener('load', () => {
        console.log(xhr.response);

        if(!xhr.response.status) {
          document.body.appendChild(hostError);
          document.body.classList.add('body--overlay-menu');
        } else {
          document.body.appendChild(successOverlay);
          document.body.classList.add('body--overlay-menu');
        };
      });


      // Overlay
     if(!validateForm(formOrder)) {
       document.body.appendChild(failOverlay);
       document.body.classList.add('body--overlay-menu');
     }
    }
    
  });
  
  function validateForm(form) {
    let valid = true;
    if(!validateField(form.elements.name)) {
      valid = false;
    }
    if(!validateField(form.elements.phone)) {
      valid = false;
    }
    if(!validateField(form.elements.comment)) {
      valid = false;
    } 
    return valid;
  }
  
  function validateField(field) {
    if (!field.checkValidity()) {
      field.nextElementSibling.textContent = field.validationMessage;
  
      return false;
    } else {
      field.nextElementSibling.textContent = 'Обязательные поля заполнены';
  
      return true;
    }
  }
  const successOverlay = createOverlay('Сообщение отправлено');
  const failOverlay = createOverlay('Заполните обязательные поля формы');
  const hostError = createOverlay('Произошла ошибка. <br> Повторите запрос позднее');

  function createOverlay(content) {
  
    const overlayElement = document.createElement('div');
    overlayElement.classList.add('form-overlay');
    
    const template = document.querySelector('#deliveryOverlay');
    overlayElement.innerHTML = template.innerHTML;
    const closeElement = overlayElement.querySelector('.overlay__close');
  
    closeElement.addEventListener('click', function() {
      document.body.removeChild(overlayElement);
      document.body.classList.remove('body--overlay-menu');
    });
  
    const contentElement = overlayElement.querySelector('.overlay__content');
    contentElement.innerHTML = content;
  
    return overlayElement;
  }
}
form();