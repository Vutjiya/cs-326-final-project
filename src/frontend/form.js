import { Events } from "./events.js";
import { municipalities } from "./municipalities.js";

export class Form {

    form;

    constructor(id, classes) {
        this.form = document.createElement("form");
        this.form.id = id;
        this.form.classList.add(...classes);
    }

    async render() {
        return this.form;
    }

    createTextInput(id, labelText, classes, name, placeholder, datalist_id, data) {
        const div = document.createElement("div");
        const label = document.createElement("label");
        const input = document.createElement("input");
        const validity = document.createElement("span");

        label.htmlFor = id;
        label.innerText = `${labelText}: `;

        input.id = id;
        input.classList.add(...classes);
        input.type = "text";
        input.name = name;
        input.placeholder = placeholder;

        validity.classList.add("validity");

        div.appendChild(label);
        div.appendChild(input);
        div.appendChild(validity);

        if (datalist_id) {
            this.createDatalistInput(datalist_id, div, input, data)
        }

        if (!input.classList.contains("optional")) {
            input.required = true;
        }

        // this.form.appendChild(div);

        return div;
    }

    createDatatimeInput(id, labelText, classes, name) {
        const div = document.createElement("div");
        const label = document.createElement("label");
        const input = document.createElement("input");
        const validity = document.createElement("span");

        label.htmlFor = id;
        label.innerText = `${labelText}: `;

        input.id = id;
        input.classList.add(...classes);
        input.type = "datetime-local";
        input.name = name;
        input.min = this.getCurrDatetime();

        if (!input.classList.contains("optional")) {
            input.required = true;
        }

        validity.classList.add("validity");

        div.appendChild(label);
        div.appendChild(input);
        div.appendChild(validity);

        // this.form.appendChild(div);

        return div;
    }

    createTelInput(id, labelText, classes, name, placeholder) {
        const div = document.createElement("div");
        const label = document.createElement("label");
        const input = document.createElement("input");
        const validity = document.createElement("span");

        label.htmlFor = id;
        label.innerText = `${labelText}: `;

        input.id = id;
        input.classList.add(...classes);
        input.type = "tel";
        input.name = name;
        input.placeholder = placeholder;
        input.pattern = "\\d{3}-\\d{3}-\\d{4}";

        if (!input.classList.contains("optional")) {
            input.required = true;
        }

        validity.classList.add("validity");

        div.appendChild(label);
        div.appendChild(input);
        div.appendChild(validity);

        // this.form.appendChild(div);

        return div;
    }

    createSubmitInput(id, classes, value) {
        const input = document.createElement("input");

        input.id = id;
        input.classList.add(...classes);
        input.type = "submit";
        input.value = value;

        // this.form.appendChild(input);
        return input;
    }

    createCheckboxInput(id, labelText, classes) {
        const div = document.createElement("div");
        const label = document.createElement("label");
        const input = document.createElement("input");

        label.htmlFor = id;
        label.innerText = `${labelText}? `;

        input.id = id;
        input.classList.add(...classes);
        input.type = "checkbox";

        if (!input.classList.contains("optional")) {
            input.required = true;
        }

        div.appendChild(label);
        div.appendChild(input);

        // this.form.appendChild(div);

        return div;
    }

    createEmailInput(id, labelText, classes, name, placeholder) {
        const div = document.createElement("div");
        const label = document.createElement("label");
        const input = document.createElement("input");
        const validity = document.createElement("span");

        label.htmlFor = id;
        label.innerText = `${labelText}: `;

        input.id = id;
        input.classList.add(...classes);
        input.type = "email";
        input.name = name;
        input.placeholder = placeholder;
        input.pattern = ".+@umass\.edu";

        if (!input.classList.contains("optional")) {
            input.required = true;
        }

        validity.classList.add("validity");

        div.appendChild(label);
        div.appendChild(input);
        div.appendChild(validity);

        // this.form.appendChild(div);
        
        return div;
    }

    createDatalistInput(id, div, input, data) {
        const list = document.createElement("datalist");

        input.setAttribute("list", id);
        list.id = id;

        // TODO: rework with json file
        data.forEach(datum => {
            const option = document.createElement("option");
            option.value = datum;
            list.appendChild(option);
        });

        input.addEventListener("input", e => {
            const optionFound = Array.from(e.currentTarget.list.options).some(option => 
                e.currentTarget.value === option.value);
    
            e.currentTarget.setCustomValidity(optionFound ? "" : "Please select a valid city/town.");
        });
        div.appendChild(list);
    }

    createNumberInput(id, labelText, classes, name, min, max) {
        const div = document.createElement("div");
        const label = document.createElement("label");
        const input = document.createElement("input");
        const validity = document.createElement("span");

        label.htmlFor = id;
        label.innerText = `${labelText}: `;

        input.id = id;
        input.classList.add(...classes);
        input.type = "number";
        input.name = name;
        input.min = min;
        input.max = max;
        input.placeholder = "1";

        if (!input.classList.contains("optional")) {
            input.required = true;
        }

        validity.classList.add("validity");

        div.appendChild(label);
        div.appendChild(input);
        div.appendChild(validity);

        // this.form.appendChild(div);

        return div;
    }

    getCurrDatetime() {
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

    deleteFormInput(id) {
        document.getElementById(id).parentElement.remove();
    }
}