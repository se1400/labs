document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript file loaded.");

    // Part 1: Set the copyright year on page load
    // Intentional bug for students to debug:
    // HTML uses id="copyright-year" but this line looks for "copyrightYear"
    const yearSpan = document.getElementById("copyrightYear");

    const now = new Date();
    const year = now.getFullYear();

    console.log("Current year is:", year);

    // This will throw an error until the id mismatch is fixed
    yearSpan.textContent = year;

    // Part 2: Toggle office hours in the Visit Campus panel
    const toggleButton = document.getElementById("toggle-hours");
    const hoursParagraph = document.getElementById("office-hours");

    toggleButton.addEventListener("click", function () {
        const isHidden = hoursParagraph.hidden;

        if (isHidden) {
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
