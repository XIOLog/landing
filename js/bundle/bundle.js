(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
window.addEventListener('DOMContentLoaded', function () {

    let topMenu = require('../parts/topMenu.js');
    let tab = require('../parts/tab.js');
    let modal = require('../parts/modal.js');
    let overlay = require('../parts/overlay.js');
    let contactForm = require('../parts/contactForm.js');
    let slider = require('../parts/slider.js');
    let calc = require('../parts/calc.js');
    let timer = require('../parts/timer.js');

    topMenu();
    tab();
    modal();
    overlay();
    contactForm();
    slider();
    calc();
    timer();
    
});
},{"../parts/calc.js":2,"../parts/contactForm.js":3,"../parts/modal.js":4,"../parts/overlay.js":5,"../parts/slider.js":6,"../parts/tab.js":7,"../parts/timer.js":8,"../parts/topMenu.js":9}],2:[function(require,module,exports){
function calc() {
    let persons = document.querySelectorAll('.counter-block-input')[0],
        restDays = document.querySelectorAll('.counter-block-input')[1],
        place = document.querySelector('#select'),
        totalValue = document.querySelector('#total'),
        personsSum = 0,
        daysSum = 0,
        total = 0;

    totalValue.innerHTML = 0;

    persons.addEventListener('change', function () {
        personsSum = +this.value;
        total = (daysSum * personsSum) * 4000;
        if (restDays.value == '') {
            totalValue.innerHTML = 0;
        } else {
            totalValue.innerHTML = total;
        }
    });

    restDays.addEventListener('change', function () {
        daysSum = +this.value;
        total = (daysSum * personsSum) * 4000;
        if (persons.value == '') {
            totalValue.innerHTML = 0;
        } else {
            totalValue.innerHTML = total;
        }
    });

    place.addEventListener('change', function () {
        if (persons.value == '' || restDays.value == '') {
            totalValue.innerHTML = 0;
        } else {
            let a = total;
            totalValue.innerHTML = a * this.options[this.selectedIndex].value;
        }
    });
}

module.exports = calc;
},{}],3:[function(require,module,exports){
function contactForm() {
    let contactForm = document.querySelector('#form'),
        contactInput = contactForm.getElementsByTagName('input');

    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();
        statusMessage.style.color = '#ffffff';
        statusMessage.style.marginTop = '10px';

        contactForm.appendChild(statusMessage);

        let request = new XMLHttpRequest();

        request.open('POST', 'server.php');
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencode');

        let formData = new FormData(contactForm);

        request.send(formData);

        request.onreadystatechange = function () {
            if (request.readyState < 4) {
                statusMessage.innerHTML = message.loading;
            } else if (request.readyState === 4) {
                if (request.status == 200 && request.status < 300) {
                    statusMessage.innerHTML = message.success;
                } else {
                    statusMessage.innerHTML = message.failure;
                }
            }
        }

        for (let i = 0; i < contactInput.length; i++) {
            contactInput[i].value = '';
        }
    });
}

module.exports = contactForm;
},{}],4:[function(require,module,exports){
function modal() {
    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close'),
        info = document.querySelector('.info');

    more.addEventListener('click', function () {
        this.classList.add('more-splash');
        overlay.style.display = "block";
        document.body.style.overflow = 'hidden';
    });

    close.addEventListener('click', function () {
        overlay.style.display = "none";
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
    });

    info.addEventListener('click', function (event) {
        let target = event.target;

        if (target.classList.contains('description-btn')) {
            overlay.style.display = "block";
            document.body.style.overflow = 'hidden';
        }
    });
}

module.exports = modal;
},{}],5:[function(require,module,exports){
function overlay() {
    let message = new Object();
    message.loading = 'Загрузка...';
    message.success = 'Данные успешно отправлены. Наши менеджеры свяжутся с вами в ближайшее время.';
    message.failure = 'Ошибка отправки данных';

    let popupForm = document.querySelector('.main-form'),
        input = popupForm.getElementsByTagName('input'),
        statusMessage = document.createElement('div');
    statusMessage.classList.add('status');

    popupForm.addEventListener('submit', function (event) {
        event.preventDefault();

        popupForm.appendChild(statusMessage);

        let request = new XMLHttpRequest();

        request.open('POST', 'server.php');
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        let formData = new FormData(popupForm);

        request.send(formData);

        request.onreadystatechange = function () {
            if (request.readyState < 4) {
                statusMessage.innerHTML = message.loading;
            } else if (request.readyState === 4) {
                if (request.status == 200 && request.status < 300) {
                    statusMessage.innerHTML = message.success;
                } else {
                    statusMessage.innerHTML = message.failure;
                }
            }
        }

        for (let i = 0; i < input.length; i++) {
            input[i].value = '';
        }
    });
}

module.exports = overlay;
},{}],6:[function(require,module,exports){
function slider() {
    let slideIndex = 1,
        slides = document.querySelectorAll('.slider-item'),
        next = document.querySelector('.next'),
        prev = document.querySelector('.prev'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');

    showSlides(slideIndex);

    function showSlides(n) {
        if (n > slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length;
        }
        for (let i = 0, j = 0; i < slides.length, j < dots.length; i++ , j++) {
            slides[i].style.display = 'none';
            dots[j].classList.remove('dot-active');
        }
        slides[slideIndex - 1].style.display = 'block';
        dots[slideIndex - 1].classList.add('dot-active');
    }

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    prev.addEventListener('click', function () {
        plusSlides(-1);
    });

    next.addEventListener('click', function () {
        plusSlides(1);
    });

    dotsWrap.addEventListener('click', function (event) {

        for (let i = 0; i < dots.length + 1; i++) {
            if (event.target.classList.contains('dot') && event.target == dots[i - 1]) {
                currentSlide(i);
            }
        }

    });
}

module.exports = slider;
},{}],7:[function(require,module,exports){
function tab() {
    let tab = document.querySelectorAll('.info-header-tab'),
        tabContent = document.querySelectorAll('.info-tabcontent'),
        info_header = document.querySelector('.info-header');

    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }
    hideTabContent(1);

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            hideTabContent(0);
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    info_header.addEventListener('click', function (event) {
        let target = event.target;

        if (target.className == 'info-header-tab') {
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    showTabContent(i);
                    break;
                }
            }
        }
    });
}

module.exports = tab;
},{}],8:[function(require,module,exports){
function timer() {
    let deadline = '2019-06-03 19:24:00';

    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((t / 1000) % 60),
            minutes = Math.floor((t / 1000 / 60) % 60),
            hours = Math.floor(t / (1000 * 60 * 60));

        let data = {
            'total': t,
            'hours': hours < 10 ? '0' + hours : hours,
            'minutes': minutes < 10 ? '0' + minutes : minutes,
            'seconds': seconds < 10 ? '0' + seconds : seconds
        }

        if (t >= 0) {
            return data;
        } else {
            return {
                'total': t,
                'hours': '00',
                'minutes': '00',
                'seconds': '00'
            };
        }
    }

    function setClock(id, endtime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds');
            
            function updateClock() {
                let t = getTimeRemaining(endtime);
                hours.innerHTML = t.hours;
                minutes.innerHTML = t.minutes;
                seconds.innerHTML = t.seconds;
                
                if (t.total <= 0) {
                    clearInterval(timeInterval);
                }
            }
            updateClock();
            
        let timeInterval = setInterval(updateClock, 1000);
    }

    setClock('timer', deadline);
}

module.exports = timer;
},{}],9:[function(require,module,exports){
function topMenu() {
    let nav = document.querySelector('nav ul');

    nav.addEventListener('click', function (event) {
        event.preventDefault();

        let target = event.target;
        if (target.getAttribute('href')) {
            let offset = document.querySelector(target.getAttribute('href')).offsetTop;
            window.scrollTo({ top: offset, behavior: 'smooth' });
        }
    });
}

module.exports = topMenu;
},{}]},{},[1]);
