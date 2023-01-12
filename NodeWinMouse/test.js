const WinMouse = require('./index.js');
function clickOpenOnce() {
    WinMouse.leftDown();
    setTimeout(() => {
        WinMouse.leftUp();
    }, Math.random() * 100);
}

function Action() {
    console.log("Action=======", runTimes);
    WinMouse.moveTo(1067, 886);
    clickOpenOnce();
    WinMouse.moveTo(964, 884);
    setTimeout(() => {
        clickOpenOnce();
    }, 2000);
}

function Battle() {
    console.log("Battle=======", runTimes);
    WinMouse.moveTo(900, 928);
    clickOpenOnce();
}

let isActive = true;
let maxCount = 10000;
let runTimes = 0;
let interval = setInterval(() => {
    if (runTimes > maxCount) {
        clearInterval(interval);
    }
    runTimes++;
    if (isActive) {
        // Action();
        Battle();
    }
}, 1500);

//877,928