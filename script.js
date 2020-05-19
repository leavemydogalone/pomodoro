let timer = document.querySelector('#timer');
let session = document.querySelector('#session');
let play = document.querySelector('#play');
let pause = document.querySelector('#pause');
let refresh = document.querySelector('#refresh');
let stop = document.querySelector('#stop');
let sessionDisplay = document.querySelector('#sessionDisplay');
let breakDisplay = document.querySelector('#breakDisplay');
const arrowButtons = document.getElementById('upper').querySelectorAll('button');
let first = 2;
let second = 5;
let third = 0;
let fourth = 0;
let sessionFirst = first;
let sessionSecond = second;
let breakFirst = 0;
let breakSecond = 5;
let change = false;
let countDown;
let countDownHasBegun = false;
play.addEventListener('click', startTimer);
stop.addEventListener('click', stopTimer);
pause.addEventListener('click', pauseTimer);
refresh.addEventListener('click', refreshTimer);
timer.textContent = `${first}${second}:${third}${fourth}`;

arrowButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      timeChange(button.id);
    });
  });

function timeChange (input) {
    if (input === 'sessionButton1') {
        if (sessionSecond === 9) {
            sessionFirst += 1;
            sessionSecond = 0;
        } else {
            sessionSecond += 1;
            
        }
    } else if (input === 'sessionButton2') {
        if (sessionSecond === 0) {
            if (sessionFirst === 0) {
                return
            } else {
                sessionFirst -= 1;
                sessionSecond = 9;
            }
        } else {
            sessionSecond -= 1;
        }
    } else if (input === 'breakButton1') {
        if (breakSecond === 9) {
            breakFirst += 1;
            breakSecond = 0;
        } else {
            breakSecond += 1; 
        }
    } else if (input === 'breakButton2') {
        if (breakSecond === 0) {
            if (breakFirst === 0){
            return;
            } else {
                breakFirst -= 1;
                breakSecond = 9;
            }
        } else {
            breakSecond -= 1;
        }
    }
    setSession();
    setBreak();
    if (countDownHasBegun === false) {
        first = sessionFirst;
        second = sessionSecond;
        setTime();
    }
}
function startTimer() {
    countDown = setInterval(decrement, 1000);
    countDownHasBegun = true;
}

function stopTimer() {
    clearInterval(countDown);
    countDownHasBegun = false;
    first = sessionFirst;
    second = sessionSecond;
    third = 0;
    fourth = 0;
    setTime();
}

function pauseTimer() {
    clearInterval(countDown)
}

function refreshTimer () {
    clearInterval(countDown);
    countDownHasBegun = false;
    sessionFirst = 2;
    sessionSecond = 5;
    breakFirst = 0;
    breakSecond = 5;
    first = 2;
    second = 5;
    third = 0;
    fourth = 0;
    setTime();
    setSession();
    setBreak();
    session.textContent === 'Session';
}

function setSession () {
    sessionDisplay.textContent = `${sessionFirst}${sessionSecond}`;
}

function setBreak () {
    breakDisplay.textContent = `${breakFirst}${breakSecond}`;
}

function setTime () {
    timer.textContent =  `${first}${second}:${third}${fourth}`;
}

function changeSecond () {
    if (fourth === 0) {
        fourth = 9; 
        change = true;
    } else {
        fourth -= 1;
    }
}

function changeFirstSecond () {
    if (change === true) {
        third -= 1
        change = false;
        if (third === -1) {
            change = true;
            third = 5;
        }
    }
}

function changeMinute () {
    if (change === true) {
        second -= 1;
        change = false;
        if (second === -1) {
            change = true;
            second = 9;
        }
    }
}

function checkForBreak () {
    if (first === -1 && session.textContent === 'Session') {
        toBreak();
    } else if (first === -1 && session.textContent === 'Break Time'){
        toSession();
    }
}

function changeFirstMinute () {
    if (change === true) {
        first -= 1;
        change = false;
        checkForBreak();
    }
}

function toSession () {
    session.textContent = 'Session';
    first = sessionFirst;
    second = sessionSecond;
    third = 0;
    fourth = 0;
}

function toBreak () {
    session.textContent = 'Break Time';
    first = breakFirst;
    second = breakSecond;
    third = 0;
    fourth = 0;  
}

function decrement () {
changeSecond();
changeFirstSecond();
changeMinute();
changeFirstMinute();
setTime();
}











