window.addEventListener('DOMContentLoaded', function () {

    /* TOP MENU */
    let nav = document.querySelector('nav ul');

    nav.addEventListener('click', function (event) {
        event.preventDefault();

        let target = event.target;
        if (target.getAttribute('href')) {
            let offset = document.querySelector(target.getAttribute('href')).offsetTop;
            window.scrollTo({ top: offset, behavior: 'smooth' });
        }
    });


    /* TABS */

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

    /* TIMER */

    let deadline = '2019-06-02 00:21:00';

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

        let timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            let t = getTimeRemaining(endtime);
            hours.innerHTML = t.hours;
            minutes.innerHTML = t.minutes;
            seconds.innerHTML = t.seconds;

            if (t.total < 0) {
                clearInterval(timeInterval);
            }
        }
        updateClock();

    }

    setClock('timer', deadline);

    /* MODAL WINDOW */

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

    /* OVERLAY FORM AJAX */

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


    /* CONTACT FORM AJAX */
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


    /* SLIDER */

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


    /* CALCULATOR */

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
});