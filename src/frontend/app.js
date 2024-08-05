import { municipalities } from "./municipalities.js";

// Helper function to display select view and hide all others
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
    // Restores state upon reloading page
    restoreState();
});

// Restores state upon reloading page
// restoreState();

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
    if (!input.classList.contains("optional")) {
        input.required = true;
    }
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

// Removes the "Profile Saved" message if the form has been updated
document.querySelectorAll("div.user-input.profile input").forEach(inputBox => {
    inputBox.addEventListener("input", () => {
        const saveMsgElm = document.getElementById("save-msg");
        if (saveMsgElm) {
            saveMsgElm.remove();
        }
    });
});

// Removes the "Request Submitted" message if the form has been updated
document.querySelectorAll("div.user-input.request input").forEach(inputBox => {
    inputBox.addEventListener("input", () => {
        const requestMsgElm = document.getElementById("request-msg");
        if (requestMsgElm) {
            requestMsgElm.remove();
        }
    });
});

// Saves profile info when clicking save profile button
document.getElementById("save-profile").addEventListener("click", saveState);


// Shows pop up when clicking save profile button
document.querySelector("form.profile").addEventListener("submit", (e) => {
    if (!document.getElementById("save-msg")) {
        const span = document.createElement("span");
        span.id = "save-msg";
        span.textContent = "Profile Saved!";
        e.currentTarget.appendChild(span);
    }
    e.preventDefault();
});

// Shows pop up when clicking request ride button
document.querySelector("form.request").addEventListener("submit", (e) => {
    const form = e.currentTarget
    let count = form.dataset.count ? parseInt(form.dataset.count) : 0;
    if (!document.getElementById("request-msg")) {
        const span = document.createElement("span");
        span.id = "request-msg";
        span.innerText = `Request Submitted!\n\nYou have submitted ${++count} request(s).`;
        form.appendChild(span);
    }
    form.dataset.count = count;
    // e.preventDefault();
});

// Checks that user input is one of the options in the datalist for all input forms
document.querySelectorAll("input[list]").forEach(input => {
    input.addEventListener("input", (e) => {
        const optionFound = Array.from(e.currentTarget.list.options).some(option => 
            e.currentTarget.value === option.value);

        e.currentTarget.setCustomValidity(optionFound ? "" : "Please select a valid city/town.");
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
// for availability form box
document.getElementById("departure").addEventListener("click", () => {
    document.getElementById("departure").min = getCurrDatetime();
});

// Updates form to include input for availability and service distance 
// if user enlists to be driver
document.getElementById("driver-checkbox").addEventListener("click", (e) => {
    const checkbox = e.currentTarget;

    if (checkbox.checked) {
        const availability = document.createElement("div");
        availability.id = "availability-container";
        availability.classList.add("user-input", "profile");
        availability.innerHTML = `
            <label for="availability">Availability:</label>
            <input id="availability" class="user-input profile box" type="datetime-local" 
            min=${getCurrDatetime()} name="availability" required>
            <span class="validity"></span>
        `;

        const distance = document.createElement("div");
        distance.id = "distance-container";
        distance.classList.add("user-input", "profile");
        distance.innerHTML = `
            <label for="distance">Service Distance (km):</label>
            <input id="distance" class="user-input profile box" type="number" min="1" 
            max="500" name="distance" placeholder="1" required>
            <span class="validity"></span>
        `;

        checkbox.parentNode.insertAdjacentElement("afterend", availability);
        availability.insertAdjacentElement("afterend", distance);
    } else {
        document.getElementById("availability-container").remove();
        document.getElementById("distance-container").remove();
    }
});
