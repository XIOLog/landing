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