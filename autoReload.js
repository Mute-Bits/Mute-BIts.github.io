const reloadPeriod = 2000;
let otherFiles = ["api.js", "say.js", "autoReload.js", "vib.js"];

// Function to display error messages on the page
function displayErrorMessage(message, color) {
    const errorDiv = document.createElement("div");
    errorDiv.style.position = "fixed";
    errorDiv.style.top = "0";
    errorDiv.style.left = "0";
    errorDiv.style.height = "100px";
    errorDiv.style.backgroundColor = color;
    errorDiv.style.color = "white";
    errorDiv.style.padding = "10px";
    errorDiv.style.zIndex = "9999";
    errorDiv.textContent = `Error: ${message}`;
    document.body.appendChild(errorDiv);

    // Hide the error message after 5 seconds
    setTimeout(() => {
        errorDiv.style.display = "none";
    }, 2000);
}

// Auto-reload functionality
(function checkForChanges() {
    const url = window.location.href; // Current page URL
    let lastModified = null;
    const lastModifiedFiles = {};

    async function fetchLastModified() {
        try {
            // Check the main page
            const response = await fetch(url, { method: "HEAD" });
            const newLastModified = response.headers.get("Last-Modified");

            if (lastModified && newLastModified && newLastModified !== lastModified) {
                console.log("Main file has changed, reloading...");
                window.location.reload();
            }

            lastModified = newLastModified;

            // Check each other file
            for (const file of otherFiles) {
                const fileUrl = new URL(file, url).href;
                const fileResponse = await fetch(fileUrl, { method: "HEAD" });
                const fileLastModified = fileResponse.headers.get("Last-Modified");

                if (lastModifiedFiles[file] && fileLastModified !== lastModifiedFiles[file]) {
                    console.log(`${file} has changed, reloading...`);
                    window.location.reload();
                }

                lastModifiedFiles[file] = fileLastModified;
            }

        } catch (error) {
            console.error("Error checking for file changes:", error);
            displayErrorMessage(`Error: ${error.message}`, "red");
        }
    }

    // Check for changes every reloadPeriod milliseconds
    setInterval(fetchLastModified, reloadPeriod);
})();
