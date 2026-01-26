document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript file loaded.");

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
