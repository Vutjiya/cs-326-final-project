import { Events } from "./events.js";

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

        const form = document.createElement("form");
        form.id = "profile-form";

        const firstNameDiv = document.createElement("div");

        const firstNameLabel = document.createElement("label");
        firstNameLabel.htmlFor = "first-name";
        firstNameLabel.innerText = "First Name: ";

        const firstNameInput = document.createElement("input");
        firstNameInput.id = "first-name";
        firstNameInput.type = "text";
        firstNameInput.name = "first-name";
        firstNameInput.placeholder = "Johnny";

        firstNameDiv.appendChild(firstNameLabel);
        firstNameDiv.appendChild(firstNameInput);

        const lastNameDiv = document.createElement("div");

        const lastNameLabel = document.createElement("label");
        lastNameLabel.htmlFor = "last-name";
        lastNameLabel.innerText = "Last Name: ";

        const lastNameInput = document.createElement("input");
        lastNameInput.id = "last-name";
        lastNameInput.type = "text";
        lastNameInput.name = "last-name";
        lastNameInput.placeholder = "Appleseed";

        lastNameDiv.appendChild(lastNameLabel);
        lastNameDiv.appendChild(lastNameInput);

        const emailDiv = document.createElement("div");

        const emailLabel = document.createElement("label");
        emailLabel.htmlFor = "email";
        emailLabel.innerText = "Email: "

        const emailInput = document.createElement("input");
        emailInput.id = "email";
        emailInput.type = "email";
        emailInput.name = "email";
        emailInput.placeholder = "jappleseed@umass.edu";


        emailDiv.appendChild(emailLabel);
        emailDiv.appendChild(emailInput);

        const phoneDiv = document.createElement("div");

        const phoneLabel = document.createElement("label");
        phoneLabel.htmlFor = "phone-number";
        phoneLabel.innerText = "Phone Number: ";

        const phoneInput = document.createElement("input");
        phoneInput.id = "phone-number";
        phoneInput.type = "tel";
        phoneInput.name = "phone-number";
        phoneInput.pattern = "\d{3}-\d{3}-\d{4}";
        phoneInput.placeholder = "123-456-7899";

        phoneDiv.appendChild(phoneLabel);
        phoneDiv.appendChild(phoneInput);

        const checkboxDiv = document.createElement("div");

        const checkboxLabel = document.createElement("label");
        checkboxLabel.htmlFor = "driver-checkbox";
        checkboxLabel.innerText = "Enlist to be a driver? "

        const checkboxInput = document.createElement("input");
        checkboxInput.id = "driver-checkbox";
        checkboxInput.classList.add("optional");
        checkboxInput.type = "checkbox";

        checkboxDiv.appendChild(checkboxLabel);
        checkboxDiv.appendChild(checkboxInput);

        const saveButton = document.createElement("input");
        saveButton.id = "save-profile";
        saveButton.type = "submit";
        saveButton.value = "Save Profile";

        form.appendChild(firstNameDiv);
        form.appendChild(lastNameDiv);
        form.appendChild(emailDiv);
        form.appendChild(phoneDiv);
        form.appendChild(checkboxDiv);
        form.appendChild(saveButton);

        profileViewElem.appendChild(blockHeader);
        profileViewElem.appendChild(form);

        return profileViewElem;
    }
}