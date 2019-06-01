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