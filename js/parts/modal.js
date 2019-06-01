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