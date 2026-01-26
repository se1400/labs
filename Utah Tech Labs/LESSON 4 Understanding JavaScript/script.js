document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript file loaded.");

    // Part 1: Set the copyright year on page load
    // Intentional mismatch for the lab:
    // HTML uses id="copyright-year" but we look for "copyrightYear"
    const yearSpan = document.getElementById("copyrightYear");

    const now = new Date();
    const year = now.getFullYear();

    console.log("Current year is:", year);

    if (!yearSpan) {
        console.error(
            'Copyright year element not found. ' +
            'Expected: id="copyrightYear" in the HTML. ' +
            'Fix by either changing the HTML span id to "copyrightYear" ' +
            'or changing this JS line to getElementById("copyright-year").'
        );
    } else {
        yearSpan.textContent = year;
        console.log("Copyright year updated on the page.");
    }

    // Part 2: Toggle office hours in the Visit Campus panel
    const toggleButton = document.getElementById("toggle-hours");
    const hoursParagraph = document.getElementById("office-hours");

    if (!toggleButton || !hoursParagraph) {
        console.error(
            "Visit Campus toggle elements not found. " +
            'Expected ids: "toggle-hours" and "office-hours".'
        );
        return;
    }

    toggleButton.addEventListener("click", function () {
        if (hoursParagraph.hidden) {
            hoursParagraph.hidden = false;
            toggleButton.textContent = "Hide office hours";
            console.log("Office hours shown.");
        } else {
            hoursParagraph.hidden = true;
            toggleButton.textContent = "Show office hours";
            console.log("Office hours hidden.");
        }
    });
});
