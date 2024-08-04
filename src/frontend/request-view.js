import { Events } from "./events.js";
import { Form } from "./form.js";
import { municipalities } from "./municipalities.js";

export class RequestView {
    constructor() {}

    async render() {
        const requestViewElem = document.createElement("div");
        requestViewElem.id = "request-view";
        requestViewElem.classList.add("view");

        const blockHeader = document.createElement("div");
        blockHeader.classList.add("colored-block");

        const headerText = document.createElement("h1");
        headerText.innerText = "Request a Ride";

        const headerImg = document.createElement("img");
        headerImg.classList.add("header-img");
        headerImg.src = "./images/yellow-car.webp";

        blockHeader.appendChild(headerText);
        blockHeader.appendChild(headerImg);

        const form = new Form("request-form", []);

        form.createFormInput("destination", "Destination:", [], "text", "destination", null, "Destination", null, "municipalities");

        form.createFormInput("departure", "Departure Time:", [], "datetime-local", "departure", null, null, null, null);

        form.createFormInput("submit-button", null, ["submit"], "submit", null, "Submit Request", null, null, null);

        requestViewElem.appendChild(blockHeader);
        requestViewElem.appendChild(form.form);

        return requestViewElem;
    }
}