window.onload = function () {
    let today = new Date();
    const calendarBody = document.querySelector('.calendar-body');
    const prevEl = document.querySelector('.prev');
    const nextEl = document.querySelector('.next');
    const createDate = document.querySelector('.createDate');
    let currentDate;

    buildCalendar();

    function buildCalendar() {
        let firstDate = new Date(today.getFullYear(), today.getMonth(), 1);
        const monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const leapYear = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        const notLeapYear = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        const headerYear = document.querySelector('.current-year-month');

        if (firstDate.getFullYear() % 4 === 0) { //윤년
            pageYear = leapYear;
        } else { //윤년x
            pageYear = notLeapYear;
        }

        headerYear.innerHTML = `${today.getFullYear()} ${monthList[firstDate.getMonth()]}`
        makeElement(firstDate);
        showMain();
        currentDateget();
    }

    function showMain() {
        const mainDay = document.querySelector('.main-day');
        const mainDate = document.querySelector('.main-date');
        const dayList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        mainDay.innerHTML = dayList[today.getDay()];
        mainDate.innerHTML = today.getDate();
    }

    function makeElement(firstDate) {
        let week = 100;
        let dateSet = 1;
        for (let i = 0; i < 6; i++) {
            let weekEl = document.createElement('div');
            weekEl.setAttribute('class', week);
            weekEl.setAttribute('id', "week");
            for (let j = 0; i < 7; j++) {
                if (i === 0 && j < firstDate.getDay() || dateSet > pageYear[firstDate.getMonth()]) {
                    let dateEl = document.createElement('div');
                    weekEl.appendChild(dateEl);
                } else {
                    let dateEl = document.createElement('div');
                    dateEl.textContent = dateSet;
                    dateEl.setAttribute('class', dateSet);
                    dateEl.setAttribute('id', `${today.format2()}-${dateSet}`);
                    weekEl.appendChild(dateEl);
                    dateSet++;
                }
            }
            week++;
            calendarBody.appendChild(weekEl);
        }
        let clickedDate = document.getElementsByClassName(today.getDate());
        clickedDate[0].classList.add('active');
    }

    function removeCalendar() {
        let divEls = document.querySelectorAll('.calendar-body > #week > div');
        for (let i = 0; i < divEls.length; i++) {
            divEls[i].remove();
        }
    }

    function showMain() {
        const mainDay = document.querySelector('.main-day');
        const mainDate = document.querySelector('.main-date');
        const dayList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        mainDay.innerHTML = dayList[today.getDay()];
        mainDate.innerHTML = today.getDate();
    }

    prevEl.addEventListener('click', function () {
        today = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
        removeCalendar();
        buildCalendar();
    })
    nextEl.addEventListener('click', function () {
        today = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
        removeCalendar();
        buildCalendar();
    })

    function currentDateget() {
        currentDate = today.format();
    }

    calendarBody.addEventListener('click', function (e) {
        let target = e.target;
        let eachDate = document.querySelectorAll('.calendar-body > #weekly > div');
        if (e.target.innerHTML === '') return;
        for (let i = 0; i < eachDate.length; i++) {
            eachDate[i].classList.remove('active');
        }
        target.classList.add('active');
        today = new Date(today.getFullYear(), today.getMonth(), target.innerHTML);
        showMain();
        currentDateget();
    })

    Date.prototype.format = function () { // 현재 날짜 보기좋게 출력 / 사용방법: newDate().format() 으로 사용가능
        var yyyy = this.getFullYear();
        var month = (this.getMonth() + 1);
        var dd = this.getDate();
        var format = [yyyy, month, dd].join('-');
        return format;
    }

    Date.prototype.format2 = function () { // 현재 날짜 보기좋게 출력 / 사용방법: newDate().format() 으로 사용가능
        var yyyy = this.getFullYear();
        var month = (this.getMonth() + 1);
        var format = [yyyy, month].join('-');
        return format;
    }




}