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

    createFormInput(id, labelText, classes, type, name, value, placeholder, pattern, datalist_id) {
        const input = document.createElement("input");

        input.id = id;
        input.classList.add(...classes);
        input.type = type;

        if (type === "submit") {
            input.value = value;
            this.form.appendChild(input);
            return this.form;
        }

        const div = document.createElement("div");
        const label = document.createElement("label")

        label.htmlFor = id;
        label.innerText = `${labelText} `;

        input.name = name;
        input.placeholder = placeholder;
        input.pattern = pattern;

        div.appendChild(label);
        div.appendChild(input);

        if (datalist_id) {
            const list = document.createElement("datalist");
            
            input.setAttribute("list", datalist_id);
            list.id = datalist_id;
            municipalities.forEach(municipality => {
                const option = document.createElement("option");
                option.value = municipality;
                list.appendChild(option);
            });

            div.appendChild(list);
        }
        // TODO: account for optional flag 
        this.form.appendChild(div);
    }

    // TODO: create deleteFormInput
}