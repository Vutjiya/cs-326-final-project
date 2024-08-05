// TODO: write documentation and error handling
import express from "express";
import logger from "morgan";
import * as db from "./database.js"

// const HEADER_FIELDS = { "Content-Type": "application/json" };

const app = express();
const PORT = 3000;
const URL = `http://localhost:${PORT}`;
app.listen(PORT, () => console.log(`Server started at ${URL}`));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("src/frontend"));

// async function createRequest(response, id) {
//     console.log("server creating!");
//     try {
//         await db.makeRequest(response, id);
//         response.writeHead(200, HEADER_FIELDS);
//         response.write(JSON.stringify({ message: "Request created!" }));
//     } catch (error) {
//         response.writeHead(404, HEADER_FIELDS);
//         response.write(JSON.stringify({ message: "Request id required" }));
//     } finally {
//         response.end()
//     }
// }

// async function readRequest() {
//     try {
//         // TODO: change 3x db.makeRequest()
//         await db.fetchRequest(response, id);
//         response.writeHead(200, HEADER_FIELDS);
//         response.write(JSON.stringify({ message: "Request received!" }));
//     } catch (error) {
//         response.writeHead(404, HEADER_FIELDS);
//         response.write(JSON.stringify({ message: `Request ${id} not found` }));
//     } finally {
//         response.end()
//     }
// }

// async function updateRequest() {
//     try {
//         await db.fetchRequest(response, id);
//         response.writeHead(200, HEADER_FIELDS);
//         response.write(JSON.stringify({ message: "Request updated!" }));
//     } catch (error) {
//         response.writeHead(404, HEADER_FIELDS);
//         response.write(JSON.stringify({ message: `Request ${id} not found` }));
//     } finally {
//         response.end()
//     }
// }

// async function deleteRequest() {
//     try {
//         await db.fetchRequest(response, id);
//         response.writeHead(200, HEADER_FIELDS);
//         response.write(JSON.stringify({ message: "Request deleted!" }));
//     } catch (error) {
//         response.writeHead(404, HEADER_FIELDS);
//         response.write(JSON.stringify({ message: `Request ${id} not found` }));
//     } finally {
//         response.end()
//     }
// }

// async function dumpRequests(response) {
//     try {
//         const counters = await db.fetchAllRequests();
//         requests.forEach(request => {
//             console.log(request);
//         });
//         response.writeHead(200, HEADER_FIELDS);
//         response.write(JSON.stringify({ message: "All requests loaded!" }));
//         // let responseText = "<h1>Counters</h1><ul>";
//         // counters.forEach((counter) => {
//             // responseText += `<li>${counter._id} = ${counter.count}</li>`;
//         // });
//         // responseText += "</ul>";

//         // response.writeHead(200, headerFields);
//         // response.write(responseText);
//     } catch (error) {
//         response.writeHead(500, HEADER_FIELDS);
//         response.write(JSON.stringify({ message: "Unable to load requests" }));
//         // response.writeHead(500, headerFields);
//         // response.write("<h1>Internal Server Error</h1>");
//         // response.write("<p>Unable to load counters</p>");
//         // response.write(`<pre>${err}</pre>`);
//     } finally {
//         response.end();
//     }
// }

app
    .route("/create")
    .post(async (req, res) => {
        console.log("app posting!");
        const data = req.body;
        const id = data.datetime;
        console.log(data);

        try {
            await db.makeRequest(data, id);
            res.status(200).json({ message: "Request created!" });
        } catch (error) {
            res.status(400).json({ message: error.message || "Request id required" });
        }
    });

app
    .route("/read")
    .get(async (req, res) => {
        const data = req.body;
        const id = data.datetime;

        try {
            await db.fetchRequest(id);
            res.status(200).json({ message: "Request fetched!" });
        } catch (error) {
            res.status(400).json({ message: `Request ${id} not found` });
        }
    });

app
    .route("/update")
    .put(async (req, res) => {
        const data = req.body;
        const id = data.datetime;

        try {
            const request = await db.fetchRequest(id);

            await db.modifyRequest(request)
            res.status(200).json({ message: "Request updated!" });
        } catch (error) {
            res.status(400).json({ message: `Request ${id} not found` });
        }
    });

app
    .route("/delete")
    .delete(async (req, res) => {
        const data = req.body;
        const id = data.datetime;

        try {
            const request = await db.fetchRequest(id);
            
            await db.removeRequest(request);
            res.status(200).json({ message: "Request deleted!" });
        } catch (error) {
            res.status(400).json({ message: `Request ${id} not found` });
        }
    });

app
    .route("/all")
    .get(async (req, res) => {
        try {
            const requests = await db.fetchAllRequests();
            requests.forEach(request => {
                console.log(request);
            });

            res.status(200).json({ message: "All requests loaded!" });
        } catch (error) {
            res.status(500).json({ message: "Unable to load requests" });
        }
    });

