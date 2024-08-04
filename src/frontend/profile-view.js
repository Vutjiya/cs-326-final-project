import { Events } from "./events.js";
import { Form } from "./form.js";

export class ProfileView {
    constructor() {}

    async render() {
        const profileViewElem = document.createElement("div");
        profileViewElem.id = "profile-view";
        profileViewElem.classList.add("view");

        const blockHeader = document.createElement("div");
        blockHeader.classList.add("colored-block");

        const headerText = document.createElement("h1");
        headerText.innerText = "Profile Information";

        const headerImg = document.createElement("img");
        headerImg.classList.add("header-img");
        headerImg.src = "./images/profile-icon.png";

        blockHeader.appendChild(headerText);
        blockHeader.appendChild(headerImg);

        const form = new Form("profile-form", []);

        const firstName = form.createTextInput("first-name", "First Name", [], "first-name", "Johnny");
        const lastName = form.createTextInput("last-name", "Last Name", [], "last-name", "Appleseed");
        const email = form.createEmailInput("email", "Email", [], "email", "jappleseed@umass.edu");
        const phone = form.createTelInput("phone-number", "Phone Number", [], "phone-number", "123-456-7899");
        const checkbox = form.createCheckboxInput("driver-checkbox", "Enlist to be a Driver", ["optional"]);
        const submitButton = form.createSubmitInput("save-profile", ["submit"], "Save Profile");

        profileViewElem.appendChild(blockHeader);
        [firstName, lastName, email, phone, checkbox, submitButton].forEach(elem => 
            profileViewElem.appendChild(elem)
        );

        checkbox.addEventListener("click", e => {
            const target = e.target;
            
            if (target.checked) {
                const availability = form.createDatatimeInput("availability", "Availability", [], "availability");
                const distance = form.createNumberInput("distance", "Service Distance (km)", [], "distance", 1, 500);

                target.parentNode.insertAdjacentElement("afterend", availability);
                availability.insertAdjacentElement("afterend", distance);
            } else {
                form.deleteFormInput("availability");
                form.deleteFormInput("distance");
            }
        });

        return profileViewElem;
    }
}