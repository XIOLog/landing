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