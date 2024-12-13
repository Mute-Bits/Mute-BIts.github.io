function vib(shakes) {
    // Check if vibration is supported on the device
    if (navigator.vibrate) {
        // Array to create a "shake" pattern (vibrate for 50ms, pause for 50ms)
        const shakePattern = [100, 400]; // Vibrate for 50ms, pause for 50ms

        // Repeat the shake pattern for the specified number of shakes
        const totalPattern = [];
        for (let i = 0; i < shakes; i++) {
            totalPattern.push(...shakePattern);
        }

        // Trigger the vibration
        navigator.vibrate(totalPattern);

        // Optional: Alert after vibration is complete
        setTimeout(() => {
            console.log(`Shake complete: ${shakes} shakes.`);
        }, totalPattern.length * 50); // This accounts for the total time of vibration
    } else {
        displayErrorMessage("Vibration not supported on this device.", "green");
    }
}
