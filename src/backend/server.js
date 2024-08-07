// TODO: write documentation and error handling
import express from "express";
import logger from "morgan";
import * as db from "./database.js"

const app = express();
const PORT = 3000;
const URL = `http://localhost:${PORT}`;
app.listen(PORT, () => console.log(`Server started at ${URL}`));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("src/frontend"));

app
    .route("/create")
    .post(async (req, res) => {
        const { destination , departure } = req.body;

        try {
            await db.makeRequest(`${destination}${departure}`, req.body);
            res.status(200).json({ 
                status: "success", 
                destination: destination,
                departure: departure,
                message: `Request created!` 
            });
        } catch (error) {
            res.status(400).json({ message: error.message || "Request id required" });
        }
    });

app
    .route("/read")
    .get(async (req, res) => {
        const { destination , departure } = req.query;

        try {
            const request = (await db.fetchAllRequests()).find(request => 
                request.destination === destination && request.departure === departure);

            res.status(200).json({ 
                status: "success", 
                destination: request.destination,
                departure: request.departure,
                message: `Request fetched!` 
            });
        } catch (error) {
            res.status(400).json({ message: `Request not found` });
        }
    });

app
    .route("/update")
    .put(async (req, res) => {
        const { requestData, newRequest } = req.body;
        
        try {
            const oldRequest = (await db.fetchAllRequests()).find(request => 
                request.destination === requestData.destination && 
                request.departure === requestData.departure);

            await db.modifyRequest(oldRequest, newRequest)
            res.status(200).json({ 
                status: "success", 
                destination: newRequest.destination,
                departure: newRequest.departure,
                message: `Request updated!` 
            });
        } catch (error) {
            res.status(400).json({ message: `Request not found` });
        }
    });

app
    .route("/delete")
    .delete(async (req, res) => {
        const { destination , departure } = req.body;

        try {
            const request = (await db.fetchAllRequests()).find(request => 
                request.destination === destination && request.departure === departure);
            
            await db.removeRequest(request);
            res.status(200).json({ 
                status: "success", 
                destination: request.destination,
                departure: request.departure,
                message: `Request deleted!` 
            });
        } catch (error) {
            res.status(400).json({ message: `Request not found` });
        }
    });

app
    .route("/all")
    .get(async (_req, res) => {
        try {
            const requestList = (await db.fetchAllRequests()).reduce((acc, curr) => {
                acc[curr._id] = { destination: curr.destination, departure: curr.departure };
                return acc;
            }, {});

            res.status(200).json({ 
                status: "success", 
                requests: requestList,
                message: "All requests loaded!" 
            });
        } catch (error) {
            res.status(500).json({ message: "Unable to load requests" });
        }
    });

