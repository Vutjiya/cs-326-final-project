// import { Events } from "./events.js";

export class Script {
    PORT = 3000;
    URL = `http://localhost:${this.PORT}`;
    HEADER_FIELDS = { "Content-Type": "application/json" };

    // TODO: implement error handling and write documentation

    async createRequest(formData) {
        const response = await fetch(`${this.URL}/create`, { 
            method: "POST", 
            headers: this.HEADER_FIELDS,
            body: JSON.stringify(formData)
        });
        const { destination, departure } = await response.json();
        return { destination, departure };
    }

    async readRequest(formData) {
        const params = new URLSearchParams(formData).toString();
        const response = await fetch(`${this.URL}/read?${params}`, { 
            method: "GET",
            headers: this.HEADER_FIELDS
        });
        const data = await response.json();
        return data;
    }

    async updateRequest(formData) {
        const response = await fetch(`${this.URL}/update`, { 
            method: "PUT",
            headers: this.HEADER_FIELDS,
            body: JSON.stringify(formData)
        });
        const data = await response.json();
        return data;
    }

    async deleteRequest(formData) {
        const response = await fetch(`${this.URL}/delete`, { 
            method: "DELETE",
            headers: this.HEADER_FIELDS,
            body: JSON.stringify(formData)
        });
        const data = await response.json();
        return data;
    }

    async viewAll() {
        const response = await fetch(`${this.URL}/all`, { 
            method: "GET", 
            headers: this.HEADER_FIELDS
        });
        const data = await response.json();
        return data.requests;
    }
}
