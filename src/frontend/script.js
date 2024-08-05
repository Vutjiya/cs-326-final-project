// TODO: implement error handling and write documentation
const form = document.getElementById("request-form");
const PORT = 3260;
const _URL = `http://localhost:${PORT}`;

async function createRequest(formData) {
    console.log("fetching!");
    const response = await fetch(`${_URL}/create`, { 
        method: "POST", 
        headers: { 
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(formData)
        });
    const data = await response.json();
    console.log(data);
}

async function readRequest(formData) {
    const params = Object.entries(formData).map(([key, val]) => `${key}=${val}`).join("&");
    const response = await fetch(`${_URL}/read?${params}`, { 
        method: "GET",
        headers: { 
            "Content-Type": "application/json" 
        },
        // body: JSON.stringify(formData)
    });
    const data = await response.json();
    console.log(data);
}

async function updateRequest(formData) {
    const response = await fetch(`${_URL}/update`, { 
        method: "PUT",
        headers: { 
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(formData)
    });
    const data = await response.json();
    console.log(data);
}

async function deleteRequest(formData) {
    const params = Object.entries(obj).map(([key, val]) => `${key}=${val}`).join("&");
    const response = await fetch(`${_URL}/delete?${params}`, { 
        method: "DELETE",
        headers: { 
            "Content-Type": "application/json" 
        },
        // body: JSON.stringify(formData)
    });
    const data = await response.json();
    console.log(data);
}

form.addEventListener("submit", async (event) => {
    form.preventDefault();
    event.preventDefault();
    const data = new FormData(form);
    console.log("event list!");
    await createRequest(Object.fromEntries(data.entries()))
})