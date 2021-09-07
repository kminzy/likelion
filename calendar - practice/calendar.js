var today = new Date();
var date = new Date();

const theYear = today.getFullYear();
const theMonth = today.getMonth();
const theDate = today.getDate();

function prevCalendar() { //이전 달
    today = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
    buildCalendar();
}

function nextCalendar() { //다음 달
    today = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
    buildCalendar();
}

function buildCalendar() {
    let doMonth = new Date(today.getFullYear(), today.getMonth(), 1); //첫날
    let lastDate = new Date(today.getFullYear(), today.getMonth() + 1, 0); //마지막날
    let tbCalendar = document.querySelector(".scriptCalendar > tbody");

    document.getElementById("calYear").innerText = today.getFullYear(); //YYYY년
    document.getElementById("calMonth").innerText = autoLeftPad((today.getMonth() + 1), 2); //MM월

    while (tbCalendar.rows.length > 0) { //이전 캘린더의 출력 결과가 남아있다면 이전 캘린더 삭제
        tbCalendar.deleteRow(tbCalendar.rows.length - 1);
    }

    let row = tbCalendar.insertRow(); //첫번째 행
    let dom = 1; //날짜가 표시될 column의 증가값
    let daysLength = (Math.ceil((doMonth.getDay() + lastDate.getDate()) / 7) * 7) - doMonth.getDay(); //그 달의 총 일수

    //달력 출력
    for (let day = 1 - doMonth.getDay(); daysLength >= day; day++) {
        let column = row.insertCell(); //각각의 날짜 cell 추가

        if (Math.sign(day) == 1 && lastDate.getDate() >= day) { //평일(지난달과 다음달의 데이터는 제외)
            column.innerText = day; //평일 날짜 데이터 삽입

            if (dom % 7 == 1) {
                column.style.color = "#FF4D4D"; //일요일
            }
            if (dom % 7 == 0) {
                column.style.color = "#4D4DFF"; //토요일
                row = tbCalendar.insertRow(); //토요일에는 다음에 올 행을 추가
            }
        }

        if (today.getFullYear() == date.getFullYear()) {
            if (today.getMonth() == date.getMonth()) {
                if (date.getDate() == day) { //현재일인 경우
                    column.style.backgroundColor = "#fcff63"; //표시
                    column.style.cursor = "pointer";
                    column.onclick = function () { //클릭했을 때 실행되는 함수
                        showSelectedDay(this); //선택된 날짜의 연도와 월 출력
                        termPrint(this); //특정(2주) 기간 출력
                        saveCalendar(this); 
                    }
                } else {
                    column.style.cursor = "pointer";
                    column.onclick = function () {
                        calendarChoiceDay(this);
                        showSelectedDay(this);
                        removePrint(this);
                    }
                }
            } else {
                column.style.cursor = "pointer";
                column.onclick = function () {
                    calendarChoiceDay(this);
                    showSelectedDay(this);
                    removePrint(this);
                }
            }
        } else {
            column.style.cursor = "pointer";
            column.onclick = function () {
                calendarChoiceDay(this);
                showSelectedDay(this);
                removePrint(this);
            }
        }

        dom++; //다음 cell로 이동

    }
}

//선택된 날짜 표시하는 함수
function calendarChoiceDay(column) {
    //기존 선택일이 존재하는 경우 초기화
    if (document.getElementsByClassName("choiceDay")[0]) {
        document.getElementsByClassName("choiceDay")[0].style.backgroundColor = "#FFFFFF";
        document.getElementsByClassName("choiceDay")[0].classList.remove("choiceDay");
    }
    column.style.backgroundColor = "#d5ccff";
    column.classList.add("choiceDay");
}

//숫자를 두자릿수로 변경
//num=앞에 0을 붙일 숫자 값 / digit=글자의 자릿수를 지정(2자릿수인 경우 00, 3자릿수인 경우 000)
function autoLeftPad(num, digit) {
    if (String(num).length < digit) {
        num = new Array(digit - String(num).length + 1).join("0") + num;
    }
    return num;
}

//값을 저장하는 배열 생성
var objArray = new Array();
var objArray2 = new Array();

//특정 기간(2주) 출력
function termPrint() {
    for (let i = 0; i <= 14; i++) {
        const twoWeeks = new Date(theYear, theMonth, theDate + i);
        objArray2.push(twoWeeks.getFullYear() + "년 " + (twoWeeks.getMonth() + 1) + "월 " + twoWeeks.getDate() + "일");
        print2();
    }
}

//오늘 외의 날짜를 선택했을 때에는 초기화
function removePrint() {
    objArray2.length = 0;
    print2();
}

//특정 기간 출력 함수
function print2() {
    var objResult2 = document.getElementById("showtermDay");
    objResult2.innerText = objArray2.join(" | ");
}

//선택한 날짜 출력 함수
// function saveCalendar() {
//     objArray.push(today.getFullYear() + "년" + today.getMonth() + "월" + day + "일");
//     print();
// }

// function print() {
//     var objResult = document.getElementById("showSavedDay");
//     objResult.innerText = objArray.join(", ");
// }

//선택된 날짜 출력
function showMain() {
    const mainDay = document.querySelector('.main-day');
    const mainDate = document.querySelector('.main-date');
    const dayList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    mainDay.innerHTML = dayList[today.getDay()];
    mainDate.innerHTML = today.getDate();
}

function currentDateget() {
    // format()을 이용해서 현재 날짜를 보기좋게 출력해주기 위해 사용.
    currentDate = today.format();
  }

//달력의 body
const calendarBody = document.querySelector('.calendar-body');
//body에 click 이벤트 추가
calendarBody.addEventListener('click', function (e) {
    let target = e.target;
    let eachDate = document.querySelectorAll('.calendar-body > tr > td');
    if (e.target.innerText === '') return;
    for (let i = 0; i < eachDate.length; i++) {
        eachDate[i].classList.remove('active');
    }
    target.classList.add('active');
    today = new Date(today.getFullYear(), today.getMonth(), target.innerText);

    showMain();
    currentDateget();
    //document.getElementById("showSelectedDay").innerHTML = today.getDate();
    showSelectedDay();
    currentDateget();
});

function showSelectedDay() {
    const mDate = document.querySelector('.main-date');
    mDate.innerHTML = today.getDate();
    document.getElementById("showSelectedDay").innerText = today.getFullYear() + "년" + (today.getMonth() + 1) + "월";
}

// function currentDateget() {
//     currentDate = today.format();
// }