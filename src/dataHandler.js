// Constants

const Store = require('electron-store');

const store = new Store();

const altCode = 16;
const ctrlCode = 17;
const spaceCode = 32;

// Variables

var stopwatch = document.getElementById('stopwatch-display');
var new_best_alert = document.getElementById('new-best-alert');
var hitime = document.getElementById('hi-time');
var timeoutId = null;
var ms = 0;
var sec = 0;
var min = 0;
var isStarted = false

function start() {
    timeoutId = setTimeout(function() {
        isStarted = true;
        ms = parseInt(ms);
        sec = parseInt(sec);
        min = parseInt(min);
 
        ms++;
 
        if (ms == 100) {
            sec = sec + 1;
            ms = 0;
        }
        if (sec == 60) {
            min = min + 1;
            sec = 0;
        }
        if (ms < 10) {
            ms = '0' + ms;
        }
        if (sec < 10) {
            sec = '0' + sec;
        }
        if (min < 10) {
            min = '0' + min;
        }
 
        stopwatch.innerHTML = min + ':' + sec + '.' + ms;

        start();
    }, 10);
}

function dnf() {
    ms = 0;
    sec = 0;
    min = 0;
    clearTimeout(timeoutId);
    stopwatch.innerHTML = 'DNF';
    isStarted = false;
}
function stop() {
    let TimeScore = stopwatch.innerHTML
    clearTimeout(timeoutId);
    isStarted = false;
    if (store.get("Best-Time") != "") {
        let previousBest = store.get("Best-Time");
        let currentBest = stopwatch.innerHTML;

        let MinAndSecPrevious = previousBest.split(":");
        let SecAndMiliPrevious = previousBest.split(".");

        let MinAndSecCurrent = currentBest.split(":");
        let SecAndMiliCurrent = previousBest.split(".");

        let prevMin = MinAndSecPrevious[1];
        let prevSec = MinAndSecPrevious[2];
        let prevMili = SecAndMiliPrevious[2];

        let curMin = MinAndSecCurrent[1];
        let curSec = MinAndSecCurrent[2];
        let curMili = SecAndMiliCurrent[2];

        if (curMin <= prevMin) {
            console.log("current minutes is less than previous minutes");
            if (curSec <= prevSec) {
                console.log("current seconds is less than previous seconds");
                if (curMili < prevMili) {
                    console.log("all faster!!!");
                    // yay!!! you got faster!!
                    new_best_alert.innerText = "New best!";
                    store.set("Best-Time", currentBest)
                }
            }
        }
    }else {
        store.set("Best-Time", "30:00.00");
        stop();
    }
    hitime.innerHTML = "Your current fastest solve time is: " + store.get("Best-Time") + "!"
}
 
function reset() {
    ms = 0;
    sec = 0;
    min = 0;
    clearTimeout(timeoutId);
    stopwatch.innerHTML = '00:00.00';
    isStarted = false;
    new_best_alert.innerText = "";
}

stop();

window.onkeydown = function(ev) {
    if (ev.which == spaceCode) {
        if (isStarted == true) {
            stop()
        } else {
            start();
        }
    }else if (ev.which == ctrlCode) {
        reset()
    }else if (ev.which == altCode) {
        dnf()
    }
}