// Wait for the HTML page to fully load before running our code
// This ensures all elements exist before we try to find them
document.addEventListener("DOMContentLoaded", function () {

    // Find elements by their ID using getElementById()
    // We store them in variables using 'const' (constant - won't change)
    const toggleButton = document.getElementById("toggle-hours");
    const hoursParagraph = document.getElementById("office-hours");

    // Safety check: make sure both elements were found
    // The '!' means "not" - so !toggleButton means "toggleButton was not found"
    if (!toggleButton || !hoursParagraph) {
        console.error(
            "Visit Campus toggle elements not found. " +
            'Expected ids: "toggle-hours" and "office-hours".'
        );
        return; // Stop here if elements weren't found
    }

    // Add a click event listener to the button
    // This function runs every time the button is clicked
    toggleButton.addEventListener("click", function () {

        // Check if the paragraph is currently hidden
        if (hoursParagraph.hidden) {
            // If hidden, show it and update button text
            hoursParagraph.hidden = false;
            toggleButton.textContent = "Hide office hours";
        } else {
            // If visible, hide it and update button text
            hoursParagraph.hidden = true;
            toggleButton.textContent = "Show office hours";
        }
    });
});
