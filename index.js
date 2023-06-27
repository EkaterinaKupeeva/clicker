let btns = document.querySelectorAll("button");
let arrayRandom = [];
let arrayClick = [];
let inputStart = document.querySelectorAll("input");


//смена уровня
let lvl = 1;
let lvlNumClick = 5;
let timeGoBtnRandom = 1000;
let timeClearBtnRandom = 5000;
let timeAddClass = 500;
let timeRemoveClass = 800;

//начало игры START
let start_btn = document.getElementById("start_btn");
start_btn.hidden = true;
for (btnNum of btns) {
  btnNum.hidden = true;
}

//иконки для кнопок
let arrayIcons = [
  '<i class="fa-regular fa-chess-knight"></i>',
  '<i class="fa-brands fa-sticker-mule"></i>',
  '<i class="fa-solid fa-bone"></i>',
  '<i class="fa-solid fa-feather-pointed"></i>',
  '<i class="fa-solid fa-guitar"></i>',
  '<i class="fa-solid fa-yin-yang"></i>',
  '<i class="fa-solid fa-dragon"></i>',
  '<i class="fa-brands fa-react"></i>',
  '<i class="fa-solid fa-volleyball"></i>',
  '<i class="fa-solid fa-dice"></i>',
  '<i class="fa-solid fa-anchor"></i> ',
  '<i class="fa-solid fa-mask"></i>',
  '<i class="fa-solid fa-user-secret"></i>',
  '<i class="fa-solid fa-earth-americas"></i>',
  '<i class="fa-solid fa-tree"></i>',
  '<i class="fa-regular fa-lemon"></i>',
  '<i class="fa-regular fa-futbol"></i>',
  '<i class="fa-regular fa-hand-spock"></i>',
  '<i class="fa-regular fa-hand-point-up"></i>',
  '<i class="fa-regular fa-snowflake"></i>',
  '<i class="fa-regular fa-paper-plane"></i>',
  '<i class="fa-regular fa-star"></i>',
  '<i class="fa-regular fa-face-grin-stars"></i>',
  '<i class="fa-regular fa-chess-queen"></i>',
];

//функция по смене содержания кнопок
function frontBtns(value) {
  if (value == "number") {
    console.log("there is number");
    for (let i = 0, num = 1; i < 9; i++, num++) {
      btns[i].innerHTML = num;
    }
    inputStart[0].classList.add('inputStartsAdd');
    inputStart[1].classList.remove('inputStartsAdd');
    inputStart[2].classList.remove('inputStartsAdd');
    btnsNoActive();
  } else if (value == "icons") {
    let randomIcons;
    console.log("there is icons");
    for (btnI of btns) {
      randomIcons = Math.round(getRandom(0, 23));
      btnI.innerHTML = `${arrayIcons[randomIcons]}`;
    }
    inputStart[0].classList.remove('inputStartsAdd');
    inputStart[1].classList.add('inputStartsAdd');
    inputStart[2].classList.remove('inputStartsAdd');
    btnsNoActive();
  } else if (value == "empty") {
    console.log("there is empty");
    for (btnOne of btns) {
      btnOne.innerHTML = " ";
    }
    inputStart[0].classList.remove('inputStartsAdd');
    inputStart[1].classList.remove('inputStartsAdd');
    inputStart[2].classList.add('inputStartsAdd');
    btnsNoActive();
  }

  for (btnNum of btns) {
    btnNum.hidden = false;
  }
  start_btn.hidden = false;
  arrayClick.splice(0, lvlNumClick);
  arrayRandom.splice(0, lvlNumClick);
  lvl = 1;
  lvlNumClick = 5;
  timeGoBtnRandom = 1000;
  timeClearBtnRandom = 5000;
  timeAddClass = 500;
  timeRemoveClass = 800;
}
//начало игры END

//функции по активации/деактивации кнопок
function btnsActive() {
  for (btn_elem of btns) {
    btn_elem.disabled = false;
  }
}
function btnsNoActive() {
  for (btn_elem of btns) {
    btn_elem.disabled = true;
  }
  start_btn.value = "НАЧАТЬ"
}



//клик на кнопку НАЧАТЬ
function getStart() {
    arrayClick.splice(0, lvlNumClick);
    arrayRandom.splice(0, lvlNumClick);
    btnsNoActive();
    result.innerHTML = 'Запомни...'
    start_btn.disabled = true;
    start_btn.style.opacity = "0";
    //блокируем смену режима кнопок
    for (input of inputStart) {
      input.disabled = true;
    }
    //включаем рандом кнопок
    let timerGo = setInterval(goBtnRandom, timeGoBtnRandom);
    setTimeout(() => {
      clearInterval(timerGo);
  //останавливаем функцию при получении n кол-ва символов
    }, timeClearBtnRandom);
  //активируем нажатие кнопок по истечению времени функции
  setTimeout(() => {
    btnsActive();
    result.innerHTML = 'Повтори'
    start_btn.disabled = false;
    start_btn.style.opacity = "1";
    start_btn.value = "ЗАНОВО"
    for (input of inputStart) {
      input.disabled = false;
    }
  }, timeClearBtnRandom + timeRemoveClass);


  }


//функция подсвечивания кнопок
function goBtnRandom() {
  let random_btn = Math.round(getRandom(0, 8));
  setTimeout(() => {
    btns[random_btn].classList.add("active");
  }, timeAddClass);
  setTimeout(() => {
    btns[random_btn].classList.remove("active");
  }, timeRemoveClass);
  arrayRandom.push(random_btn);
}

//звуки для выдачи результата

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

//отслеживания кликов пользователя
function getClick(num) {
  arrayClick.push(num);
  if (arrayClick.length == lvlNumClick) {
    //Верно
    if (arrayClick.toString() === arrayRandom.toString()) {
      result.innerHTML = "Правильно!";
      lvl += 1;
      timeGoBtnRandom *= 0.8;
      timeAddClass *= 0.8;
      timeRemoveClass *= 0.8;
      if (lvl <= 3) {
        lvlNumClick += 1;
      }
      timeClearBtnRandom = timeGoBtnRandom * lvlNumClick;
    } else {
      //Неверно
      result.innerHTML = `Неверно. `;
      //у кнопок с цифрами показываем правильный ответ
      let trueArray = " ";
      for (element of arrayRandom) {
        trueArray += element + 1 + " ";
      }
      if (btns[0].innerHTML == '1') {
        result.innerHTML += `Правильный порядок:${trueArray} `
      }
      trueArray = " ";
    }

    start_btn.disabled = false;
    start_btn.style.opacity = "1";
    btnsNoActive();
    start_btn.value = "НАЧАТЬ"
  }
}


