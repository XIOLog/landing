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