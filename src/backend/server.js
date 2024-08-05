// TODO: write documentation and error handling
import express from "express";
import logger from "morgan";
import * as db from "./database.js"

const HEADER_FIELDS = { "Content-Type": "application/json" };

const app = express();
const PORT = 3260;
const URL = `http://localhost:${PORT}`;
app.listen(PORT, () => console.log(`Server started at ${URL}`));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("src/frontend"));

async function createRequest(response, id) {
    console.log("server creating!");
    try {
        await db.makeRequest(response, id);
        response.writeHead(200, HEADER_FIELDS);
        response.write("Request created!");
    } catch (error) {
        response.writeHead(404, HEADER_FIELDS);
        response.write("Request id required");
    } finally {
        response.end()
    }
}

async function readRequest() {
    try {
        await db.makeRequest(response, id);
        response.writeHead(200, HEADER_FIELDS);
        response.write("Request received!")
    } catch (error) {
        response.writeHead(404, HEADER_FIELDS);
        response.write(`Request ${id} not found`);
    } finally {
        response.end()
    }
}

async function updateRequest() {
    try {
        await db.makeRequest(response, id);
        response.writeHead(200, HEADER_FIELDS);
        response.write("Request updated!")
    } catch (error) {
        response.writeHead(404, HEADER_FIELDS);
        response.write(`Request ${id} not found`);
    } finally {
        response.end()
    }
}

async function deleteRequest() {
    try {
        await db.makeRequest(response, id);
        response.writeHead(200, HEADER_FIELDS);
        response.write("Request deleted!")
    } catch (error) {
        response.writeHead(404, HEADER_FIELDS);
        response.write(`Request ${id} not found`);
    } finally {
        response.end()
    }
}

app
    .route("/create")
    .post(async (request, response) => {
        const options = request.query;
        createRequest(response, options.datetime);
    });

app
    .route("/read")
    .get(async (request, response) => {
        const options = request.query;
        readRequest(response, options.datetime);
    });

app
    .route("/update")
    .put(async (request, response) => {
        const options = request.query;
        updateRequest(response, options.datetime);
    });

app
    .route("/delete")
    .delete(async (request, response) => {
        const options = request.query;
        deleteRequest(response, options.datetime);
    });
