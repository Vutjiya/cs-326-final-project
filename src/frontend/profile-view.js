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

        form.createTextInput("first-name", "First Name", [], "first-name", "Johnny");
        form.createTextInput("last-name", "Last Name", [], "last-name", "Appleseed");
        form.createEmailInput("email", "Email", [], "email", "jappleseed@umass.edu");
        form.createTelInput("phone-number", "Phone Number", [], "phone-number", "123-456-7899");
        form.createCheckboxInput("driver-checkbox", "Enlist to be a Driver", ["optional"]);
        form.createSubmitInput("save-profile", ["submit"], "Save Profile");

        profileViewElem.appendChild(blockHeader);
        profileViewElem.appendChild(await form.render());

        return profileViewElem;
    }
}