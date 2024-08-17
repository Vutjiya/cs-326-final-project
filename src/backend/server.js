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
app.use(express.urlencoded({ extended: true }));
app.use(express.static("src/frontend"));

app
    .route("/create-request")
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
    .route("/read-request")
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
    .route("/update-request")
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
    .route("/delete-request")
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
    .route("/all-requests")
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

    app
    .route("/create-profile")
    .post(async (req, res) => {
        const { firstName , lastName, email, phoneNumber, availability, distance } = req.body;

        try {
            await db.makeProfile(`${firstName}${lastName}`, req.body);
            res.status(200).json({ 
                status: "success", 
                firstName: firstName,
                lastName: lastName,
                email: email,
                phoneNumber: phoneNumber,
                availability: availability,
                distance: distance,
                message: `Profile created!` 
            });
        } catch (error) {
            res.status(400).json({ message: error.message || "Profile id required" });
        }
    });

app
    .route("/read-profile")
    .get(async (req, res) => {
        const { firstName , lastName, email, phoneNumber, availability, distance } = req.query;

        try {
            const profile = (await db.fetchAllProfiles()).find(profile => 
                profile.firstName === firstName && profile.lastName === lastName);

            res.status(200).json({ 
                status: "success",
                firstName: profile.firstName,
                lastName: profile.lastName,
                email: profile.email,
                phoneNumber: profile.phoneNumber,
                availability: profile.availability,
                distance: profile.distance,
                message: `Profile fetched!`
            });
        } catch (error) {
            res.status(400).json({ message: `Profile not found` });
        }
    });

app
    .route("/update-profile")
    .put(async (req, res) => {
        const { profileData, newProfile } = req.body;
        
        try {
            const oldProfile = (await db.fetchAllProfiles()).find(profile => 
                profile.firstName === profileData.firstName && 
                profile.lastName === profileData.lastName);

            await db.modifyProfile(oldProfile, newProfile)
            res.status(200).json({ 
                status: "success", 
                firstName: newProfile.firstName,
                lastName: newProfile.lastName,
                email: newProfile.email,
                phoneNumber: newProfile.phoneNumber,
                availability: newProfile.availability,
                distance: newProfile.distance,
                message: `Profile updated!` 
            });
        } catch (error) {
            res.status(400).json({ message: `Profile not found` });
        }
    });

app
    .route("/delete-profile")
    .delete(async (req, res) => {
        const { firstName , lastName, email, phoneNumber, availability, distance } = req.body;

        try {
            const profile = (await db.fetchAllProfiles()).find(profile => 
                profile.firstName === firstName && profile.lastName === lastName);
            
            await db.removeProfile(profile);
            res.status(200).json({ 
                status: "success", 
                firstName: profile.firstName,
                lastName: profile.lastName,
                email: profile.email,
                phoneNumber: profile.phoneNumber,
                availability: profile.availability,
                distance: profile.distance,
                message: `Profile deleted!` 
            });
        } catch (error) {
            res.status(400).json({ message: `Profile not found` });
        }
    });

app
    .route("/all-profiles")
    .get(async (_req, res) => {
        try {
            const profileList = (await db.fetchAllProfiles()).reduce((acc, curr) => {
                acc[curr._id] = { 
                    firstName: curr.firstName, 
                    lastName: curr.lastName, 
                    email: curr.email,
                    phoneNumber: curr.phoneNumber,
                    availability: curr.availability,
                    distance: curr.distance
                };
                return acc;
            }, {});

            res.status(200).json({ 
                status: "success", 
                profiles: profileList,
                message: "All profiles loaded!" 
            });
        } catch (error) {
            res.status(500).json({ message: "Unable to load profiles" });
        }
    });
