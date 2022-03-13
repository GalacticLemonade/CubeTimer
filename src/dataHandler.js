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

store.set("BestTime", "30:00:00");
console.log(store.get("BestTime"));

function convertToMs(str) {
    var splitString = str.toString().split(":");
    let minutes = parseInt(splitString[0]);
    let seconds = parseInt(splitString[1]);
    let ms = parseInt(splitString[2]);


    let convertedMinutes = minutes * 60000;
    let convertedSeconds = seconds * 1000;

    console.log(convertedMinutes + convertedSeconds + ms);
    return(convertedMinutes + convertedSeconds + ms)
}

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
 
        stopwatch.innerHTML = min + ':' + sec + ':' + ms;

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
    if (store.get("BestTime") != "") {
        let previousBestMS = convertToMs(store.get("BestTime"));
        let currentBestMS = convertToMs(stopwatch.innerHTML);


        if (currentBestMS >= previousBestMS) {
            let diff = currentBestMS - previousBestMS;
            console.log(diff);

            if (diff > 0) {
                // yay!!! you got faster!!
                new_best_alert.innerText = "New best!";
                store.set("BestTime", currentBest)
            }
        }

    }else {
        store.set("BestTime", "30:00:00");
        stop();
    }
    hitime.innerHTML = "Your current fastest solve time is: " + store.get("BestTime") + "!"
}
 
function reset() {
    ms = 0;
    sec = 0;
    min = 0;
    clearTimeout(timeoutId);
    stopwatch.innerHTML = '00:00:00';
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