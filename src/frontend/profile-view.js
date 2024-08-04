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

        form.createFormInput("first-name", "First Name:", [], "text", "first-name", null, "Johnny", null, null);

        form.createFormInput("last-name", "Last Name:", [], "text", "last-name", null, "Appleseed", null, null);

        form.createFormInput("email", "Email:", [], "email", "email", null, "jappleseed@umass.edu");

        form.createFormInput("phone-number", "Phone Number:", [], "tel", "phone-number", null, "123-456-7899", "\d{3}-\d{3}-\d{4}", null);

        form.createFormInput("driver-checkbox", "Enlist to be a driver?", ["optional"], "checkbox", null, null, null, null, null);

        form.createFormInput("save-profile", null, ["submit"], "submit", null, "Save Profile", null, null, null);

        profileViewElem.appendChild(blockHeader);
        profileViewElem.appendChild(form.form);

        return profileViewElem;
    }
}