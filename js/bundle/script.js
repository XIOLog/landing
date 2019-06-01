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