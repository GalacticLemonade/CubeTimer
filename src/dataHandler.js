// Constants

const Store = require('electron-store');

const store = new Store();

const altCode = 18;
const ctrlCode = 17;
const spaceCode = 32;

// Variables

var stopwatch = document.getElementById('stopwatch-display');
var new_best_alert = document.getElementById('new-best-alert');
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
}
 
function reset() {
    ms = 0;
    sec = 0;
    min = 0;
    clearTimeout(timeoutId);
    stopwatch.innerHTML = '00:00.00';
    isStarted = false;
}

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