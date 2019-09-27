let today = new Date(); // 오늘 날짜 생성
let tbody = document.querySelector("tbody").children;
let td = document.querySelectorAll("td");

let dayArr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let dayArrBig = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

//이번달
function makeCalender(now) {
  //이번달, 이번해 표기
  let weekYear = document.querySelector(".weekYear");
  let todayYear = today.getFullYear();
  let todayMonth_number = today.getMonth();
  let todayMonth = "";
  let monthArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "Decembar"]
  for(let i = 0; i < monthArr.length; i++) {
    if(todayMonth_number === i) {
      todayMonth = monthArr[i];
    }
  }
  weekYear.innerHTML = todayMonth + " " + todayYear;

  let oneDay = new Date(now.getFullYear(), now.getMonth(), 1); // 이번달 1일 생성
  let lastDay = new Date(now.getFullYear(), now.getMonth()+1, 0).getDate(); // 이번달 마지막일

  let oneDay_week_number = oneDay.getDay(); // 이번달 1일 요일 생성 (숫자)
  let oneDay_week = ""; // 이번달 1일 요일 생성 (알파벳)
  for(let i = 0; i < dayArr.length; i++) {
    if(oneDay_week_number === i) {
      oneDay_week = dayArr[i];
    }
  }

  let week = document.querySelector("#week").children; // 요일만 있는 위치
  let firstWeek = document.querySelector(".first").children; // 1일 시작 위치
  
  //첫째주
  let day = 1; 
  for(let i = 0 ; i < firstWeek.length; i++) {
    if(week[i].innerHTML === oneDay_week) {
      firstWeek[i].innerHTML = day;
      day++;
    } else {
      if(day !== 1) {
        firstWeek[i].innerHTML = day;
        day++;
      }
    }
  }
 
  //둘째주~
  for(let i = 3; i < 7; i++) {
    for(let j = 0; j < 7; j++) {
      if(day <= lastDay) {
        tbody[i].children[j].innerHTML = day;
        day++;
      }
    }
  }

  //마지막날짜 누락 방지
  if(Number(tbody[6].children[6].innerHTML) !== lastDay) {
    for(let i = 0; i < 6; i++) {
      if(day <= lastDay) {
        tbody[2].children[i].innerHTML = day;
        day++;
      }
    }
  }
}
makeCalender(today);

//다음달
let nextMonth = document.querySelector(".nextMonth");
nextMonth.addEventListener("click", function() {
  today = new Date(today.getFullYear(), today.getMonth()+1, today.getDate());

  //이전 날짜 초기화
  for(let i = 2; i < 7; i++) {
    for(let j = 0; j < 7; j++) {
    tbody[i].children[j].innerHTML = ""; 
    }
  }

  //선택된 날짜 표시 지우기
  for(let i = 0; i < td.length; i++) {
    if(td[i].classList.contains("selectDate")) {
      td[i].classList.remove("selectDate");
    }
  }

  makeCalender(today);
});

//이전달
let previousMonth = document.querySelector(".previousMonth");
previousMonth.addEventListener("click", function() {
  today = new Date(today.getFullYear(), today.getMonth()-1, today.getDate());

  //이전 날짜 초기화
  for(let i = 2; i < 7; i++) {
    for(let j = 0; j < 7; j++) {
    tbody[i].children[j].innerHTML = ""; 
    }
  }

  //선택된 날짜 표시 지우기
  for(let i = 0; i < td.length; i++) {
    if(td[i].classList.contains("selectDate")) {
      td[i].classList.remove("selectDate");
    }
  }

  makeCalender(today);
});

let selectDay = document.querySelector(".day");
let selectWeek = document.querySelector(".week");

//왼쪽에 오늘의 날짜, 요일 -> 원하는 날짜 선택하면 바뀔 부분
selectDay.innerHTML = today.getDate();

let selectWeek_number = today.getDay();
let selectWeek_value = "";
for(let i = 0; i < dayArrBig.length; i++) {
  if(selectWeek_number === i) {
    selectWeek_value = dayArrBig[i];
  }
}
selectWeek.innerHTML = selectWeek_value;

for(let i = 0; i < td.length; i++) {
  if(Number(td[i].innerHTML) === today.getDate()) {
    td[i].classList.add("selectDate");
  }
}

//주말 글자색 표시, 날짜 영역 마우스 올리면 손가락 표시로 바꾸기
for(let i = 1; i < 7; i++) {
  tbody[i].children[0].classList.add("red");
  tbody[i].children[6].classList.add("blue");
}

for(let i = 10; i < 45; i++) {
  td[i].classList.add("pointer");
}

//날짜 선택하면 활성화(검은 배경+노란 글씨) 및 왼쪽에 선택한 날짜와 요일 표시
for(let i = 10; i < 45; i++) {
  td[i].addEventListener("click", function(){
    selectDay.innerHTML = event.currentTarget.innerHTML;
    
    for(let i = 0; i < dayArrBig.length; i++) {
      if(event.currentTarget.cellIndex === i) {
        selectWeek.innerHTML = dayArrBig[i];
      }
    }

    for(let i = 0; i < td.length; i++) {
      td[i].classList.remove("selectDate");
    }

    event.currentTarget.classList.add("selectDate");
  });
}

//[To Do List]
let add = document.querySelector(".add");
let contents = document.querySelector(".contents");
let ul = document.querySelector(".ulItem");
let filter = document.querySelector(".filter");
let filterSelect = null;

//To-Do-List 갯수 정리 : 첫화면, 날짜선택, list 추가할 때, list compelete할 때
const rawData = []; //입력한 모든 list 담아두기
const selectData = []; //선택된 날짜 list만 담아두기
const randomData = []; //list를 만들면서 고유의 랜덤 숫자를 만들어 담아두기

add.addEventListener("click", function(){
  let compareValue = document.querySelector(".day").innerHTML + document.querySelector(".weekYear").innerHTML.split(" ").join();
  
  makeRawArr();
  makeSelectArr(compareValue); // 선택한 날짜의 list만 담기
  resetLi(); // 이전 list reset
  makelist(); // 선택한 날짜의 list로 DOM 구성
  itemNumberfnc(); // active list 갯수 세기
});

//입력한 list rawData에 입력하기
function makeRawArr() {
  let selectValue = document.querySelector(".selectDate").innerHTML + document.querySelector(".weekYear").innerHTML.split(" ").join();
  
  let dataObject = {};
  dataObject["date"] = selectValue;
  dataObject["contents"] = contents.value;
  
  function random () {
    let randomValue = Math.floor(Math.random() * 1000);
    if(!randomData.includes(randomValue)) {
      randomData.push(randomValue);
      dataObject["randomValue"] = randomValue;
    } else {
      random();
    }
  }
  random();

  dataObject["complete"] = false;
  dataObject["delete"] = false;
  
  rawData.push(dataObject);
}

//선택된 날짜 list만 담기
function makeSelectArr(somethingDate) {
  selectData.length = 0;
  for(let i = 0; i < rawData.length; i++) {
    if(somethingDate === rawData[i]["date"]) {
      if(rawData[i]["delete"] === false) {
        selectData.push(rawData[i]);
      }
    }
  }
}

//담겨진 List 전부 지우기 (선택한 날짜 등 조건에 따라 다시 담기 위해 모두 초기화)
function resetLi() {
  let removeLi;
  if(ul.children.length > 0) {
    removeLi = ul.children;
    for(let i = removeLi.length-1; i >= 0; i--) {
      removeLi[i].remove();
    }
  }
}

//selectData에 담긴 list로 DOM 구성
function makelist() {
  let filterSelect = document.querySelector(".filterSelect");

  for(let i = 0; i < selectData.length; i++) {
    let li = document.createElement("li");
    li.classList.add(selectData[i]["randomValue"]);
    li.classList.add("display");
    
    if(filterSelect !== null && filterSelect.innerHTML === "Active") {
      if(selectData[i]["complete"] === true) {
        li.classList.add("displayNone");
        li.classList.remove("display");
      }
    } else if (filterSelect !== null && filterSelect.innerHTML === "Completed") {
      if(selectData[i]["complete"] !== true) {
        li.classList.add("displayNone");
        li.classList.remove("display");
      }
    }
  
    let spanCheck = document.createElement("span");
    spanCheck.classList.add("spanCheck");
  
    let spanContent = document.createElement("span");
    spanContent.classList.add("spanContent");
    spanContent.innerHTML = selectData[i]["contents"];
  
    let spanDelete = document.createElement("span");
    spanDelete.classList.add("spanDelete");
    spanDelete.innerHTML = "x";

    if(selectData[i]["complete"] === true) {
      li.classList.add("complete");
      spanCheck.classList.add("compeleteCheck");
      spanContent.classList.add("compeletedContent");
    }
     
    li.appendChild(spanCheck);
    li.appendChild(spanContent);
    li.appendChild(spanDelete);
    ul.appendChild(li);
  }
}

//active list 갯수 세기
function itemNumberfnc() {
  let itemNumberValue = ul.children.length;

  for(let i = 0; i < ul.children.length; i++) {
    if(ul.children[i].classList.contains("complete")){
      itemNumberValue--;
    }
  }

  let itemNumber = document.querySelector(".itemNumber");
  itemNumber.innerHTML = itemNumberValue + " item left"; 
}


//list 선택하면 compelete 처리(동그라미 배경 검은색, list 내용 취소선), x 버튼 누르면 li 전체 삭제 
ul.addEventListener("click", function(){
  if(event.target.classList.contains("spanContent")) {
    event.target.previousElementSibling.classList.toggle("compeleteCheck");
    event.target.classList.toggle("compeletedContent");
    event.target.parentElement.classList.toggle("complete");
  } else if(event.target.classList.contains("spanCheck")) {
    event.target.classList.toggle("compeleteCheck");
    event.target.nextElementSibling.classList.toggle("compeletedContent");
    event.target.parentElement.classList.toggle("complete");
  } else if(event.target.classList.contains("spanDelete")) {
    for(let i = 0; i < rawData.length; i++) {
      if(event.target.parentElement.classList.contains(rawData[i]["randomValue"].toString())) {
        rawData[i]["delete"] = true;
      }
    }
    event.target.parentElement.remove();
  }

  itemNumberfnc();

  //raw data 업데이트 : complete인지 아닌지 체크해서 정보 넣어주기
  for(let i = 0; i < rawData.length; i++) {
    if(event.target.parentElement.classList.contains(rawData[i]["randomValue"])) {
      if(event.target.parentElement.classList.contains("complete")) {
        rawData[i]["complete"] = true;
      } else {rawData[i]["complete"] = false;
      }
    }
  }
  
  //filter가 "active"일 때, list complete상태로 바꾸면 안보이게 처리, or "completed"일 때, list complete상태를 풀게 되면 안보이게 처리,
  filterSelect = document.querySelector(".filterSelect");
  if(filterSelect !== null && filterSelect.innerHTML !== "All") {
    event.target.parentElement.classList.toggle("display");
    event.target.parentElement.classList.toggle("displayNone");
  }
});

//선택된 날짜의 to-do-list만 보여주기
for(let i = 10; i < 45; i++) {
  td[i].addEventListener("click", function(){
    let clickValue = event.target.innerHTML + document.querySelector(".weekYear").innerHTML.split(" ").join();
    makeSelectArr(clickValue);
    resetLi();
    makelist();
    itemNumberfnc();

    //날짜를 바꾸면, 이전에 filtering 걸어 둔 것 초기화  
    for(let i = 0; i < filter.children.length; i++) {
      filter.children[i].classList.remove("filterSelect");
    }
  });
}

//clear complete
let clear = document.querySelector(".clearItem");
clear.addEventListener("click", function(){
  let complete = document.querySelectorAll(".complete");
  let completeRandom = [];

  for(let i = 0; i < complete.length; i++) {
    completeRandom.push(complete[i].className.split(" ")[0]);
  }
  
  for(let i = 0; i < rawData.length; i++) {
    if(completeRandom.includes(rawData[i]["randomValue"].toString())) {
      rawData[i]["delete"] = true;
    }
  }

  for(let i = 0; i < complete.length; i++) {
    complete[i].remove();
  }
});

// classList 조정 반복 함수
function classListfnc (element, addclass, removeclass) {
  element.classList.add(addclass);
  element.classList.remove(removeclass);
}

// filtering : All, Active, Completed
filter.addEventListener("click", filtering);

function filtering () {
  //선택한 filter 진하게 표시
  for(let i = 0; i < filter.children.length; i++) {
    if(event.target.innerHTML !== filter.children[i].innerHTML) {
      filter.children[i].classList.remove("filterSelect");
    } else {
      filter.children[i].classList.add("filterSelect");
    }
  }

  let liList = ul.children;
  for(let i = 0; i < liList.length; i++) {
    if(event.target.innerHTML === "Active") {
      if(liList[i].classList.contains("complete")) {
        classListfnc(liList[i], "displayNone", "display");
      } else {
        classListfnc(liList[i], "display", "displayNone");
      }
    } else if (event.target.innerHTML === "Completed") {
      if(!liList[i].classList.contains("complete")) {
        classListfnc(liList[i], "displayNone", "display");
      } else {
        classListfnc(liList[i], "display", "displayNone");
      }
    } else {
        classListfnc(liList[i], "display", "displayNone");
    }
  }
}
