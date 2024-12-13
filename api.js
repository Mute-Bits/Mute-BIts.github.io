let last = 0;
let lastCounter = 0;
let timer = 0;
const timerBreak = 20;
const box = document.getElementById("box");
const boxc = document.getElementById("boxc");
const c = document.getElementById("c");

const t = document.getElementById("timer");

// Gyroscope functionality
if (window.DeviceOrientationEvent) {
    window.addEventListener("deviceorientation", function(event) {
        displayStat(event);
        const compass = event.alpha.toFixed(2); // z-axis
        const raise = event.beta.toFixed(2);
        const rotation = event.gamma.toFixed(2);
        
        let r = Number(rotation) + 150.0;
        box.style.left = r+"px";
        boxc.innerText = r+"px";

        if(timeAllow()){
            if(same(last, rotation, 5)){
                lastCounter++;
            }else{
                lastCounter = 0;
                box.style.backgroundColor = "rgb(13, 117, 202)";
            }
    
            if(lastCounter > 4){
                box.style.backgroundColor = "rgb(202, 13, 19)";
            }
            last = rotation;
        }
        c.innerText = lastCounter;
        
    });
} else {
    displayErrorMessage("DeviceOrientation is not supported on this device/browser.", "black");
}



function same(n, m, margin){
    return Math.abs(n - m) < margin;
}


function timeAllow(){
    timer++;
    if(timer > timerBreak){
        timer = 0;
    }
    if(timer % 20 == 0){
        t.innerText = timer;
        return true;
    }
    return false;
}









function displayStat(event){
    document.getElementById("alpha").textContent = event.alpha.toFixed(2);
    document.getElementById("beta").textContent = event.beta.toFixed(2);
    document.getElementById("gamma").textContent = event.gamma.toFixed(2);
}