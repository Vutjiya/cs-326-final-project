

const URL = "http://localhost:3260";

async function createRequest() {
    const response = await fetch(`${URL}/create?`, { method: "POST"});
    const data = response.json();
    counterResponse.innerHTML = data;
}

async function readRequest() {
    const response = await fetch(`${URL}/read?`, { method: "GET"});
    const data = response.json();
    counterResponse.innerHTML = data;
}

async function updateRequest() {
    const response = await fetch(`${URL}/update?`, { method: "PUT"});
    const data = response.json();
    counterResponse.innerHTML = data;
}

async function deleteRequest() {
    const response = await fetch(`${URL}/delete?`, { method: "DELETE"});
    const data = response.json();
    counterResponse.innerHTML = data;
}
