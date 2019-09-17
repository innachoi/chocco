// One Page Scroll 
const sections = $('.section');
const display = $('.maincontent');
let inscroll = false;

const mobileDetect = new MobileDetect(window.navigator.userAgent);
const isMobile = mobileDetect.mobile();

const countPosition = sectionEq => {
  return `${sectionEq * -100}%`;
};

const switchActiveClass = (elems, elemNdx) => {
  elems
    .eq(elemNdx)
    .addClass("active")
    .siblings()
    .removeClass("active");
};

const unBlockScroll = () => {
  setTimeout(() => {
    inscroll = false;
  }, 1600); // Время ожидания завершения инерции
};

const performTransition = sectionEq => {
  if(inscroll) return;
  
  inscroll = true;
  const position = countPosition(sectionEq);
  const swithFixedMenuActiveClass = () => 
    switchActiveClass($('.menu-fixed__item'), sectionEq);
  swithFixedMenuActiveClass();

  switchActiveClass(sections, sectionEq);

  unBlockScroll();

  display.css({
    transform: `translateY(${position})`
  });

};

const scrollViewport = direction => {
  const activeSection = sections.filter('.active');
  const nextSection = activeSection.next();
  const prevSection = activeSection.prev();

  if (direction === 'next' && nextSection.length) {
    performTransition(nextSection.index());
  }

  if (direction === 'prev' && prevSection.length) {
    performTransition(prevSection.index());
  }


}

$(document).on('wheel', e => {
  const deltaY = e.originalEvent.deltaY;

  if(deltaY > 0) {
    scrollViewport('next');
  }

  if(deltaY < 0) {
    scrollViewport('prev');
  }
});

$(document).on('keydown', e => {
  const tagName = e.target.tagName.toLowerCase();
  const userIsTypingInInputs = tagName === 'input' || tagName === 'textarea';

  if (userIsTypingInInputs) return;

  switch(e.keyCode) {
    case 38:
      scrollViewport('prev');
      break;
    case 40:
      scrollViewport('next');
      break;
  }
});

$('[data-scroll-to]').on('click', e => {
  e.preventDefault();

  const target = parseInt($(e.currentTarget).attr('data-scroll-to'));
  performTransition(target);
});

if(isMobile) {
  window.addEventListener('touchmove', e => {
    e.preventDefault();
  }, {passive: false})
  
  $("body").swipe({
    swipe: (event, direction) => {
      let scrollDirecrion;
      if (direction === "up") scrollDirecrion = "next";
      if (direction === "down") scrollDirecrion = "prev";
      scrollViewport(scrollDirecrion);
    }
  });
}



// Menu Overlay

let overlayMenu = (function (options) {

  let buttonOpen = document.querySelector(options.buttonOpen);
  let buttonClose = document.querySelector(options.buttonClose);
  let menu = document.querySelector(options.menu);
  let body = document.querySelector('body');

  let _toggleMenu = function(e) {
    e.preventDefault();
    menu.classList.toggle('overlay--show');
    body.classList.toggle('body--overlay-menu');
  }

  let addListeners = function() {
    buttonOpen.addEventListener('click', _toggleMenu);
    buttonClose.addEventListener('click', _toggleMenu);

    menu.addEventListener ('click', function(e) {
      let target = e.target;
      if (target.classList.contains('menu__link')) {
        _toggleMenu(e);
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

// Team Acco

let teamAcco = () => {
  let memberAcco = document.querySelectorAll('.member__acco');

  memberAcco.forEach(function(memberName) {
    memberName.addEventListener('click', function(e) {
      e.preventDefault();
  
      let memberActive = document.querySelector('.member__desc.member__desc--active');

      
      if(memberActive) {
        let memberDetails = memberActive.querySelector('.member__skills');
        memberDetails.style.height = '0px';
        memberActive.classList.remove('member__desc--active');
      };

      if(!memberActive) {
        let memberCurrent = e.target.closest('.member__desc');
        memberCurrent.classList.add('member__desc--active');
        let memberCurrentDetails = memberCurrent.querySelector('.member__skills');
        memberCurrentDetails.style.height = memberCurrentDetails.scrollHeight + 'px';
        
      }
    })
  })

};
teamAcco();

// MENU Accordion

let menuAcco = () => {
  let menuList = document.querySelector('.chocco-menu__list');

  menuList.addEventListener('click', e => {
    e.preventDefault();

    let target = e.target;

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

// const choccoSlider = (function() {
//   const slider = document.querySelector('.ingredients__slider');
//   const arrowBack = document.querySelector('.arrow--back');
//   const arrowFront = document.querySelector('.arrow--front');
//   const computed = getComputedStyle(slider);

//   let sliderWidth = parseInt(computed.width);

//   window.addEventListener('resize', function() {
//     currentRight = 0;
//     slider.style.right = currentRight;
//     sliderWidth = parseInt(computed.width);
//   }, true);

//   var sliderItemCounter = slider.children.length;

//   let moveSlide = function(direction) {
//     direction.addEventListener('click', function(e) {
//       e.preventDefault();
//       let currentRight = parseInt(computed.right);

//       if(currentRight < (sliderItemCounter-1)*sliderWidth && direction==arrowFront) {
//         slider.style.right = currentRight + sliderWidth + 'px';
//       };

//       if(currentRight > 0 && direction==arrowBack) {
//         slider.style.right = currentRight - sliderWidth + 'px';
//       }

//       if(currentRight === (sliderItemCounter-1)*sliderWidth && direction==arrowFront) {
//         slider.style.right = 0 + 'px';
//       }

//       if(currentRight == 0 && direction==arrowBack) {
//         slider.style.right = 0 + sliderWidth + 'px';
//       }
//     });
//   }
//   let addListeners = function() {
//     moveSlide(arrowBack);
//     moveSlide(arrowFront);
//   }
//   return {init: addListeners};
// })();

// choccoSlider.init();

$(function () {

  var moveSlide = function (container, slideNum) {
    let 
        items = container.find('.ingredients__slider-item'),
        activeSlide = items.filter('.active'),
        reqItem = items.eq(slideNum),
        reqIndex = reqItem.index(),
        sliderList = container.find('.ingredients__slider'),
        duration = 500;

    if (reqItem.length) {
      sliderList.animate({
        'left': -reqIndex * 100 + '%'
      }, duration, function () {
        activeSlide.removeClass('active');
        reqItem.addClass('active');
  
      });
    }
  }

  $('.ingredients__arrow').on('click', function(e) {
    e.preventDefault();

    let $this = $(this),
        container = $this.closest('.ingredients__container'),
        items = container.find('.ingredients__slider-item'),
        activeItem = items.filter('.active'),
        nextItem = activeItem.next(),
        prevItem = activeItem.prev();

    if($this.hasClass('arrow--right')) {

      if(nextItem.length) {
        moveSlide(container, nextItem.index());
      } else {
        moveSlide(container, items.first().index());
      } 
      
    } else {

      if(prevItem.length) {
        moveSlide(container, prevItem.index());
      } else {
        moveSlide(container, items.last().index());
      } 
    }
  });

});


// Ingredients 

$('.ingredients__tab.ingredients__tab--seaweed').hover(
  function(){
    $('.ingredients__table-container.ingredients__table-container--seaweed').css('opacity', '1')
  },
)
$('.ingredients__tab.ingredients__tab--grape').hover(
  function(){
    $('.ingredients__table-container.ingredients__table-container--grape').css('opacity', '1')
  },
)

$('.ingredients__tab.ingredients__tab--seaweed').on('click', function() {
  $('.ingredients__table-container.ingredients__table-container--seaweed').css('opacity', '1')
});
$('.ingredients__tab.ingredients__tab--grape').on('click', function() {
  $('.ingredients__table-container.ingredients__table-container--grape').css('opacity', '1')
});

$(".ingredients__table-closeBtn").on('click', function() {
  $('.ingredients__table-container').css('opacity', '0');
});




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

// Player

let video;
let timingControl;
let volumeControl;
let intervalId;

$().ready(function() {
  video = document.getElementById('video');
  video.addEventListener('click', playStop);

  let volControl = document.querySelector(".toolbar__icon--volume");
  volControl.addEventListener('click', soundOff);

  let playBtn = document.querySelectorAll('.play');
  for (let i=0; i < playBtn.length; i++) {
    playBtn[i].addEventListener('click', playStop);
  }

  timingControl = document.querySelector('.toolbar__range.toolbar__range--timing');
  timingControl.addEventListener('mousedown', stopInterval);
  timingControl.addEventListener('mouseup', setVideoTiming);

  timingControl.min = 0;
  timingControl.value = 0;

  volumeControl = document.querySelector('.toolbar__range.toolbar__range--volume');
  volumeControl.addEventListener('mouseup', changeSoundVolume);

  volumeControl.min = 0;
  volumeControl.max = 10;

  video.addEventListener('ended', function () {
    document.querySelector(".video-player__playBtn").classList.toggle("video-player__playBtn--active");
    video.currentTime = 0;
  }, false);
});


function playStop() {
  document.querySelector('.video-player__playBtn').classList.toggle('video-player__playBtn--active');

  timingControl.max = video.duration;

  if(video.paused) {
    video.webkitRequestFullScreen();
    video.play();
    intervalId = setInterval(updateDuration,1000/66);
  } else {
    video.pause();
    clearInterval(intervalId);
  }
};

function stopInterval(){
  video.webkitExitFullscreen();
  video.pause();
  clearInterval(intervalId);
}

function setVideoTiming(){

  video.currentTime = timingControl.value;
  intervalId = setInterval(updateDuration,1000/66);

  if (video.paused){
      video.play();
      document.getElementsByClassName('video-player__playBtn')[0].classList.remove('video-player__playBtn--active');
  }
}

function updateDuration(){    
  timingControl.value = video.currentTime;
}

function soundOff(){    
  if (video.volume === 0){
      video.volume = soundLevel;
      volumeControl.value = soundLevel*10;
  }else{
      soundLevel = video.volume;
      video.volume = 0;
      volumeControl.value = 0;
  }    
}

function changeSoundVolume(){
 
  video.volume = volumeControl.value/10; 
}

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

// Yandex Map 

ymaps.ready(init);

function init() {
  const map = new ymaps.Map('map', {
    center: [55.7521,37.5955],
    zoom: 14,
    controls: ['zoomControl'],
    behaviors: ['drag']
  });

  let geoObjects = map.geoObjects
    .add(new ymaps.Placemark([55.7587, 37.5824], {
      hintContent: '<div class="map__hint">Баррикадная улица, 2/1с3</div>',
      balloonContent: [
        '<div class="map__balloon">',
        '<img class="map__chocco-img" src="../img/background/bars.png" alt="Шоколадки"/>',
        'Самые вкусные и полезные батончики! <br>Заходите по адресу: Баррикадная улица, 2/1с3',
        '</div>'
    ].join('')
    },
    {
      iconLayout: 'default#image',
      iconImageHref: '../img/icons/map-mark.png',
      iconImageSize: [44, 54],
    }
    ))
    .add(new ymaps.Placemark([55.7573, 37.6260], {
      hintContent: '<div class="map__hint">Новая площадь, 14</div>',
      balloonContent: [
        '<div class="map__balloon">',
        '<img class="map__chocco-img" src="../img/background/bars.png" alt="Шоколадки"/>',
        'С 10 по 22 сентября дарим подарки! <br>Заходите по адресу: Новая площадь, 14',
        '</div>'
    ].join('')
    },
    {
      iconLayout: 'default#image',
      iconImageHref: '../img/icons/map-mark.png',
      iconImageSize: [44, 54],
    }
    ))
    .add(new ymaps.Placemark([55.7510, 37.6082], {
      hintContent: '<div class="map__hint">улица Воздвиженка, 4/7с1</div>',
      balloonContent: [
        '<div class="map__balloon">',
        '<img class="map__chocco-img" src="../img/background/bars.png" alt="Шоколадки"/>',
        'Акция 2+1! Захвати полезный перекус другу!<br>Заходите по адресу: улица Воздвиженка, 4/7с1',
        '</div>'
    ].join('')
    },
    {
      iconLayout: 'default#image',
      iconImageHref: '../img/icons/map-mark.png',
      iconImageSize: [44, 54],
    }
    ))
    .add(new ymaps.Placemark([55.7443, 37.5803], {
      hintContent: '<div class="map__hint">Смоленская улица, 3с2</div>',
      balloonContent: [
        '<div class="map__balloon">',
        '<img class="map__chocco-img" src="../img/background/bars.png" alt="Шоколадки"/>',
        'Открытие нового магазина!<br>Заходите по адресу: Смоленская улица, 3с2',
        '</div>'
    ].join('')
    },
    {
      iconLayout: 'default#image',
      iconImageHref: '../img/icons/map-mark.png',
      iconImageSize: [44, 54],
    }
    ));

 

}