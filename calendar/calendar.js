window.onload = function () {

    let today = new Date();

    const calendarBody = document.querySelector('.calendar-body');
    const prevEl = document.querySelector('.prev');
    const nextEl = document.querySelector('.next');
    let currentDate;


    buildCalendar();
    showToday();


    function buildCalendar() {
        let firstDate = new Date(today.getFullYear(), today.getMonth(), 1);
        const monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const leapYear = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        const notLeapYear = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        const headerYear = document.querySelector('.current-year-month');
        // 윤년 체크하기
        if (firstDate.getFullYear() % 4 === 0) {
            pageYear = leapYear;
        } else {
            pageYear = notLeapYear;
        }
        headerYear.innerHTML = `${today.getFullYear()} ${monthList[firstDate.getMonth()]}`;
        makeElement(firstDate);
        showYM();
        currentDateget();
        resetInsert();
    }

    prevEl.addEventListener('click', function () {
        today = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
        removeCalendar();
        buildCalendar();
        resetInsert();
        redrawLi()
    });

    nextEl.addEventListener('click', function () {
        today = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
        removeCalendar();
        buildCalendar();
        resetInsert();
        redrawLi()
    });

    function makeElement(firstDate) {
        let weekly = 100;
        let dateSet = 1;
        for (let i = 0; i < 6; i++) {
            let weeklyEl = document.createElement('div');
            weeklyEl.setAttribute('class', weekly);
            weeklyEl.setAttribute('id', "weekly");
            for (let j = 0; j < 7; j++) {
                //현재 달의 일수가 몇일인지 반환, 출력 종료조건
                if (i === 0 && j < firstDate.getDay() || dateSet > pageYear[firstDate.getMonth()]) {
                    //해당 칸에 날짜가 없으면 div엘리먼트만 생성한다.
                    let dateEl = document.createElement('div');
                    weeklyEl.appendChild(dateEl);
                } else {
                    //해당 칸에 날짜가 있으면 div엘리먼트 생성 후 해당 날짜 넣어주기
                    let dateEl = document.createElement('div');
                    dateEl.textContent = dateSet;
                    dateEl.setAttribute('class', dateSet);
                    dateEl.setAttribute('id', `${today.format2()}-${dateSet}`);
                    dateEl.style.cursor = "pointer";
                    weeklyEl.appendChild(dateEl);
                    dateSet++;
                }
            }
            weekly++;
            calendarBody.appendChild(weeklyEl);
        }
        // 현재 내가 선택한 날짜가 있으면 이전 달, 다음 달로 넘어가도 화면에 보여주기 위해 써줌
        let clickedDate = document.getElementsByClassName(today.getDate());
        clickedDate[0].classList.add('active');
    }

    function removeCalendar() {
        let divEls = document.querySelectorAll('.calendar-body > #weekly > div');
        for (let i = 0; i < divEls.length; i++) {
            divEls[i].remove();
        }
    }

    function showYM() {
        const mainYear = document.querySelector('.main-year');
        const mainMonth = document.querySelector('.main-month');
        const mainDate = document.querySelector('.main-date');
        //const dayList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        mainYear.innerHTML = today.getFullYear() + "년";
        mainMonth.innerHTML = today.getMonth() + 1 + "월";
        mainDate.innerHTML = today.getDate() + "일";
    }

    function showToday() {
        const todayYear = document.querySelector('.today-year');
        const todayMonth = document.querySelector('.today-month');
        const todayDate = document.querySelector('.today-date');

        let date = new Date();

        todayYear.innerHTML = date.getFullYear() + "년";
        todayMonth.innerHTML = date.getMonth() + 1 + "월";
        todayDate.innerHTML = date.getDate() + "일";
    }

    function currentDateget() {
        // format()을 이용해서 현재 날짜를 보기좋게 출력해주기 위해 사용.
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

        showYM();
        currentDateget();
        redrawLi();
        resetInsert();
        saveCalendar();
    });


    function resetInsert() {
        let storeObj = localStorage.getItem(currentDate);
        if (storeObj !== null) {
            // parse 해주기 전에는 localStorage는 string만 가져오니까 parse해준다.
            const parsed = JSON.parse(localStorage.getItem(currentDate));
            // forEach로 작성되있는 모든 todolist의 항목들을 돌면서 로컬에 저장되어 있는 목록을 화면에 만들어준다.
        }
    }
    resetInsert();


    var objArray2 = new Array();

    const saveBtn = document.querySelector('.save-btn');
    saveBtn.addEventListener('click', function (e) {
        e.preventDefault();
        let inputValue = today.getFullYear() + "년" + (today.getMonth() + 1) + "월" + today.getDate() + "일";
        objArray2.push(inputValue);
        print2();
    });

    //특정 기간 출력 함수
    function print2() {
        var objResult2 = document.getElementById("showSavedDay");
        objResult2.innerText = objArray2.join(", ");
    }





}

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