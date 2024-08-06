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
        console.log("app posting!");
        const { destination , departure } = req.body;

        try {
            await db.makeRequest(req.body, departure);
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
        console.log(req.query, "query check!");
        try {
            await db.fetchRequest(departure);
            res.status(200).json({ 
                status: "success", 
                destination: destination,
                departure: departure,
                message: `Request fetched!` 
            });
        } catch (error) {
            res.status(400).json({ message: `Request ${departure} not found` });
        }
    });

app
    .route("/update")
    .put(async (req, res) => {
        const { destination , departure } = req.body;

        try {
            const request = await db.fetchRequest(departure);

            await db.modifyRequest(request)
            res.status(200).json({ 
                status: "success", 
                destination: destination,
                departure: departure,
                message: `Request updated!` 
            });
        } catch (error) {
            res.status(400).json({ message: `Request ${departure} not found` });
        }
    });

app
    .route("/delete")
    .delete(async (req, res) => {
        const { destination , departure } = req.body;

        try {
            const request = await db.fetchRequest(departure);
            
            await db.removeRequest(request);
            res.status(200).json({ 
                status: "success", 
                destination: destination,
                departure: departure,
                message: `Request deleted!` 
            });
        } catch (error) {
            res.status(400).json({ message: `Request ${departure} not found` });
        }
    });

app
    .route("/all")
    .get(async (_req, res) => {
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

