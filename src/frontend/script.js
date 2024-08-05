import { Events } from "./events.js";

export class Script {
    PORT = 3260;
    URL = `http://localhost:${this.PORT}`;
    #events = null;

    constructor() {
        this.#events = Events.events();
    }

    // TODO: implement error handling and write documentation

    async createRequest(formData) {
        console.log("fetching!");
        const response = await fetch(`${this.URL}/create`, { 
            method: "POST", 
            headers: { 
                "Content-Type": "application/json" 
            },
            body: JSON.stringify(formData)
            });
        const data = await response.json();
        console.log(data);
    }

    async readRequest(formData) {
        const params = Object.entries(formData).map(([key, val]) => `${key}=${val}`).join("&");
        const response = await fetch(`${this.URL}/read?${params}`, { 
            method: "GET",
            headers: { 
                "Content-Type": "application/json" 
            },
            // body: JSON.stringify(formData)
        });
        const data = await response.json();
        console.log(data);
    }

    async updateRequest(formData) {
        const response = await fetch(`${this.URL}/update`, { 
            method: "PUT",
            headers: { 
                "Content-Type": "application/json" 
            },
            body: JSON.stringify(formData)
        });
        const data = await response.json();
        console.log(data);
    }

    async deleteRequest(formData) {
        const params = Object.entries(obj).map(([key, val]) => `${key}=${val}`).join("&");
        const response = await fetch(`${this.URL}/delete?${params}`, { 
            method: "DELETE",
            headers: { 
                "Content-Type": "application/json" 
            },
            // body: JSON.stringify(formData)
        });
        const data = await response.json();
        console.log(data);
    }

    // form.addEventListener("submit", async (event) => {
    //     form.preventDefault();
    //     event.preventDefault();
    //     const data = new FormData(form);
    //     console.log(data)
    //     console.log("event list!");
    //     await createRequest(Object.fromEntries(data.entries()))
    // });

    // #addListener() {
    //     this.#events.subscribe("req-button-loaded", form => {
    //         form.addEventListener("submit", async (event) => {
    //             form.preventDefault();
    //             event.preventDefault();
    //             const data = new FormData(form);
    //             console.log(data);
    //             console.log("event list!");
    //             await this.#createRequest(Object.fromEntries(data.entries()));
    //         });
    //     });
    // }
}