import { Events } from "./events.js";
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

        const form = document.createElement("form");
        form.id = "request-form";

        const destDiv = document.createElement("div");

        const destLabel = document.createElement("label");
        destLabel.htmlFor = "destination";
        destLabel.innerText = "Destination: ";

        const destInput = document.createElement("input");
        destInput.id = "destination";
        destInput.type = "text";
        destInput.name = "destination";
        destInput.placeholder = "Destination";
        destInput.setAttribute("list", "municipalities");

        const destOptions = document.createElement("datalist");
        destOptions.id = "municipalities";

        // TODO: change to using json instead
        municipalities.forEach(municipality => {
            const option = document.createElement("option");
            option.value = municipality;
            destOptions.appendChild(option);
        });

        destDiv.appendChild(destLabel);
        destDiv.appendChild(destInput);
        destDiv.appendChild(destOptions);

        const departDiv = document.createElement("div");

        const departLabel = document.createElement("label");
        departLabel.htmlFor = "departure";
        departLabel.innerText = "Departure Time: ";

        const departInput = document.createElement("input");
        departInput.id = "departure";
        departInput.type = "datetime-local";
        departInput.name = "datetime";

        departDiv.appendChild(departLabel);
        departDiv.appendChild(departInput);

        const submitButton = document.createElement("input");
        submitButton.type = "submit";
        submitButton.value = "Submit Request";


        form.appendChild(destDiv);
        form.appendChild(departDiv);
        form.appendChild(submitButton);

        requestViewElem.appendChild(blockHeader);
        requestViewElem.appendChild(form);

        return requestViewElem;
    }
}