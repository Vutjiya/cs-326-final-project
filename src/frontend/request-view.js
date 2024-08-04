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

        form.createTextInput("destination", "Destination", [], "destination", "Destination", "municipalities", municipalities);
        form.createDatatimeInput("departure", "Departure Time", [], "departure");
        form.createSubmitInput("submit-button", ["submit"], "Submit Request");

        requestViewElem.appendChild(blockHeader);
        requestViewElem.appendChild(await form.render())

        return requestViewElem;
    }
}