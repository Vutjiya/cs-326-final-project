import { municipalities } from "./municipalities.js";

function navigateTo(viewId) {
    // Hide all views
    document.querySelectorAll(".view").forEach(view => view.style.display = "none");
    // Show requested view
    document.getElementById(viewId).style.display = "block";
    // Save the current view to local storage
    window.localStorage.setItem("currentView", viewId);
}

// Adds event listener for each button
document.querySelectorAll("nav button").forEach(button => {
    button.addEventListener("click", () => navigateTo(`${button.id}-view`));
});

// Saves info in each form box on profile view
function saveState() {
    document.querySelectorAll(".profile.box").forEach(inputBox => 
        window.localStorage.setItem(inputBox.id, JSON.stringify(inputBox.value))
    );
}

// Restores info in each form box on profile view
function restoreState() {
    document.querySelectorAll(".profile.box").forEach(inputBox => 
        inputBox.value = JSON.parse(window.localStorage.getItem(inputBox.id))
    );
}

// Restore the view from local storage otherwise default to home view
window.addEventListener("load", () => {
    navigateTo(localStorage.getItem("currentView") || "home-view");
});

// Restores state upon reloading page
restoreState();

const dropDown = document.getElementById("municipalities");

// Load in each each municipality as an option for each datalist
municipalities.forEach(municipality => {
    const option = document.createElement("option");
    option.value = municipality;
    option.classList.add("hometown-item");
    dropDown.appendChild(option);
});

// Set each input form to be required
document.querySelectorAll("input").forEach(input => {
    input.required = true;
});

// Adds symbol indicator for whether user input is valid
document.querySelectorAll("div.user-input").forEach(container => {
    const validity = document.createElement("span");
    validity.classList.add("validity");
    container.childNodes.forEach(child => {
        if (child.nodeName.toLowerCase() === "input") {
        // Inserts span element after each input element
        container.insertBefore(validity, child.nextSibling)
        }
    });
});

// Saves profile info when clicking save profile button
document.getElementById("save-profile").addEventListener("click", saveState);


// Shows pop up when clicking save profile button
document.querySelector("form.profile").addEventListener("submit", function () {
    const confirm = document.createElement("span");
    confirm.textContent = "Profile Saved!"
    this.appendChild(confirm);
});

// Shows pop up when clicking request ride button
document.querySelector("form.request").addEventListener("submit", function () {
    const confirm = document.createElement("span");
    confirm.textContent = "Request Submitted!"
    this.appendChild(confirm);
});

// Checks that user input is one of the options in the datalist for all input forms
document.querySelectorAll("input[list]").forEach(input => {
    input.addEventListener("input", function () {
        const datalist = this.list;
        const optionFound = Array.from(datalist.options).some(option => this.value === option.value);
        this.setCustomValidity(optionFound ? "" : "Please select a valid city/town.");
    });
});

// Gets the current date and time (EST) in ISO format (YYYY-MM-DDThh:mm)
function getCurrDatetime() {
    return new Intl.DateTimeFormat("sv-SE", {
        timeZone: "America/New_York",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    })
    .formatToParts(new Date())
    .reduce((acc, curr) => 
        curr.value === " " ? acc + "T" : acc + curr.value, "");
}

// Makes sure you cannot select a date and time before the current data and time
document.getElementById("departure").addEventListener("click", () => {
    document.getElementById("departure").min = getCurrDatetime();
});

document.getElementById("availability").addEventListener("click", () => {
    document.getElementById("availability").min = getCurrDatetime();
});

// TODO: input should only be validated by user input is complete
// TODO: add in local storage
// TODO: add x to hometown + destination view
// TODO: add available days to profile view
// TODO: get rid of repetition in html file via dynamic DOM
// TODO: default to home view when loading in app
