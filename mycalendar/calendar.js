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
    let doMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    let lastDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    let tbCalendar = document.querySelector(".scriptCalendar > tbody");

    document.getElementById("calYear").innerText = today.getFullYear(); //YYYY년
    document.getElementById("calMonth").innerText = autoLeftPad((today.getMonth() + 1), 2); //MM월

    while (tbCalendar.rows.length > 0) { //이전 캘린더의 출력 결과가 남아있다면 이전 캘린더 삭제
        tbCalendar.deleteRow(tbCalendar.rows.length - 1);
    }

    let row = tbCalendar.insertRow(); //첫번째 개행
    let dom = 1; //날짜가 표기될 열의 증가값
    //시작일의 요일값(doMonth.getDay()) + 해당월의 전체일(lastDate.getDate())을 더해준 값에서
    //7로 나눈값을 올림(Math.ceil())하고 다시 시작일의 요일값(doMonth.getDay())을 빼준다
    let daysLength = (Math.ceil((doMonth.getDay() + lastDate.getDate()) / 7) * 7) - doMonth.getDay();

    //달력 출력
    //시작값은 1을 직접 지정하고 요일값(doMonth.getDay())을 빼서 마이너스(-)로 for문을 시작한다
    for (let day = 1 - doMonth.getDay(); daysLength >= day; day++) {
        let column = row.insertCell();
        
        column.id = day;

        if (Math.sign(day) == 1 && lastDate.getDate() >= day) { //평일(전월일과 익월일의 데이터 제외)
            column.innerText = autoLeftPad(day, 2); //평일 날짜 데이터 삽입

            if (dom % 7 == 1) {
                column.style.color = "#FF4D4D"; //일요일인 경우
            }
            if (dom % 7 == 0) {
                column.style.color = "#4D4DFF"; //토요일인 경우
                row = tbCalendar.insertRow();
            }
        }

        if (today.getFullYear() == date.getFullYear()) {
            if (today.getMonth() == date.getMonth()) {
                if (date.getDate() == day) { //현재일인 경우 표시
                    column.style.backgroundColor = "#fcff63";
                    column.style.cursor = "pointer";
                    column.onclick = function () {
                        showSelectedDay(this);
                        termPrint(this);
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

        // if(column.id == today.getDate()){
        //     saveCalendar();
        // }

        dom++;


    }
}

function calendarChoiceDay(column) {
    //기존 선택일이 존재하는 경우 선택일의 표시형식을 초기화
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

function showSelectedDay() {
    document.getElementById("showSelectedDay").innerText = today.getFullYear() + "년" + (today.getMonth() + 1) + "월";
}

var objArray = new Array();
var objArray2 = new Array();

function termPrint() {
    // var caltoday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    // caltoday.setDate(caltoday.getDate() + 14);
    // row.style.backgroundColor = "#fcff63";
    // document.getElementById("ge").innerText = caltoday.getDate();
    //objArray2.push(caltoday.getFullYear() + "년" + (caltoday.getMonth()+1) + "월" + (caltoday.getDate()) + "일");
    //print2();
    for (let i = 0; i <= 14; i++) {
        const twoWeeks = new Date(theYear, theMonth, theDate + i);
        objArray2.push(twoWeeks.getFullYear() + "년 " + (twoWeeks.getMonth() + 1) + "월 " + twoWeeks.getDate() + "일");
        print2();
    }
}

function removePrint() {
    objArray2.length = 0;
    print2();
}


function saveCalendar() {
    objArray.push(today.getFullYear() + "년" + today.getMonth() + "월" + autoLeftPad(day, 2) + "일");
    print();
}

function print2() {
    var objResult2 = document.getElementById("showtermDay");
    objResult2.innerText = objArray2.join(" | ");
}

function print() {
    var objResult = document.getElementById("showSavedDay");
    objResult.innerText = objArray.join(", ");
}