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

        const destination = form.createTextInput("destination", "Destination", [], "destination", "Destination", "municipalities", municipalities);
        const departure = form.createDatatimeInput("departure", "Departure Time", [], "departure");
        const submitButton = form.createSubmitInput("submit-button", ["submit"], "Submit Request");

        requestViewElem.appendChild(blockHeader);
        [destination, departure, submitButton].forEach(elem => 
            requestViewElem.appendChild(elem)
        );

        const block = document.createElement("div");
        block.classList.add("view");
        const p = document.createElement("p");
        p.textContent = `The quick brown fox jumped over the lazy dog`
        block.appendChild(p);
        requestViewElem.appendChild(block);

        return requestViewElem;
    }
}

export class Requests {


}