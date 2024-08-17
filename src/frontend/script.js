// import { Events } from "./events.js";

export class Script {
    PORT = 3000;
    URL = `http://localhost:${this.PORT}`;
    HEADER_FIELDS = { "Content-Type": "application/json" };

    async createRequest(formData) {
        const response = await fetch(`${this.URL}/create-request`, { 
            method: "POST", 
            headers: this.HEADER_FIELDS,
            body: JSON.stringify(formData)
        });
        const { destination, departure } = await response.json();
        return { destination, departure };
    }

    async readRequest(formData) {
        const params = new URLSearchParams(formData).toString();
        const response = await fetch(`${this.URL}/read-request?${params}`, { 
            method: "GET",
            headers: this.HEADER_FIELDS
        });
        const data = await response.json();
        return data;
    }

    async updateRequest(formData) {
        const response = await fetch(`${this.URL}/update-request`, { 
            method: "PUT",
            headers: this.HEADER_FIELDS,
            body: JSON.stringify(formData)
        });
        const data = await response.json();
        return data;
    }

    async deleteRequest(formData) {
        const response = await fetch(`${this.URL}/delete-request`, { 
            method: "DELETE",
            headers: this.HEADER_FIELDS,
            body: JSON.stringify(formData)
        });
        const data = await response.json();
        return data;
    }

    async viewAllRequests() {
        const response = await fetch(`${this.URL}/all-requests`, { 
            method: "GET", 
            headers: this.HEADER_FIELDS
        });
        const data = await response.json();
        return data.requests;
    }

    async createProfile(formData) {
        const response = await fetch(`${this.URL}/create-profile`, { 
            method: "POST", 
            headers: this.HEADER_FIELDS,
            body: JSON.stringify(formData)
        });
        const { destination, departure } = await response.json();
        return { destination, departure };
    }

    async readProfile(formData) {
        const params = new URLSearchParams(formData).toString();
        const response = await fetch(`${this.URL}/read-profile?${params}`, { 
            method: "GET",
            headers: this.HEADER_FIELDS
        });
        const data = await response.json();
        return data;
    }

    async updateProfile(formData) {
        const response = await fetch(`${this.URL}/update-profile`, { 
            method: "PUT",
            headers: this.HEADER_FIELDS,
            body: JSON.stringify(formData)
        });
        const data = await response.json();
        return data;
    }

    async deleteProfile(formData) {
        const response = await fetch(`${this.URL}/delete-profile`, { 
            method: "DELETE",
            headers: this.HEADER_FIELDS,
            body: JSON.stringify(formData)
        });
        const data = await response.json();
        return data;
    }

    async viewAllProfiles() {
        const response = await fetch(`${this.URL}/all-profiles`, { 
            method: "GET", 
            headers: this.HEADER_FIELDS
        });
        const data = await response.json();
        return data.profiles;
    }
}
