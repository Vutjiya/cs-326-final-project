import express from "express";
import logger from "morgan";
import * as db from "./database.js"

const app = express();
const PORT = 3260;

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


async function createRequest() {
    
}

async function readRequest() {

}

async function updateRequest() {

}

async function deleteRequest() {

}

app
    .route("/create")
    .post(async (request, response) => {
        const options = request.query;
        createRequest(response, options.name);
    })
    .all(MethodNotAllowedHandler);

app
    .route("/read")
    .get(async (request, response) => {
        const options = request.query;
        readRequest(response, options.name);
    });

app
    .route("/update")
    .put(async (request, response) => {
        const options = request.query;
        updateRequest(response, options.name);
    });

app
    .route("/delete")
    .delete(async (request, response) => {
        const options = request.query;
        deleteRequest(response, options.name);
    });

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
    });