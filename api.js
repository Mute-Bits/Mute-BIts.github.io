// Gyroscope functionality
if (window.DeviceOrientationEvent) {
    window.addEventListener("deviceorientation", function(event) {
    document.getElementById("alpha").textContent = event.alpha.toFixed(2);
    document.getElementById("beta").textContent = event.beta.toFixed(2);
    document.getElementById("gamma").textContent = event.gamma.toFixed(2);
    });
} else {
    displayErrorMessage("DeviceOrientation is not supported on this device/browser.", "black");
}

