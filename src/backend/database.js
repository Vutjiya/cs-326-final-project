// TODO: write documentation
import PouchDB from "pouchdb";

const dbRequest = new PouchDB("requests");
const dbProfile = new PouchDB("profiles");

async function makeRequest(id, request) {
    try {
        await dbRequest.put({_id: id, ...request });
    } catch (error) {
        console.log(error);
    }
}

async function fetchRequest(request) {
    try {
        return await dbRequest.get(request._id);
    } catch (error) {
        console.log(error);
    }
}

async function modifyRequest(oldRequest, newRequest) {
    try {
        await dbRequest.put({ _id: oldRequest._id, _rev: oldRequest._rev, ...newRequest });
    } catch (error) {
        console.log(error);
    }
}

async function removeRequest(request) {
    try {
        await dbRequest.remove(request);
    } catch (error) {
        console.log(error);
    }
}

async function fetchAllRequests() {
    try {
        return (await dbRequest.allDocs({ include_docs: true })).rows.map(row => row.doc);
    } catch (error) {
        console.log(error);
    }
}

async function makeProfile(id, profile) {
    try {
        await dbProfile.put({_id: id, ...profile });
    } catch (error) {
        console.log(error);
    }
}

async function fetchProfile(profile) {
    try {
        return await dbProfile.get(profile._id);
    } catch (error) {
        console.log(error);
    }
}

async function modifyProfile(oldProfile, newProfile) {
    try {
        await dbProfile.put({ _id: oldProfile._id, _rev: oldProfile._rev, ...newProfile });
    } catch (error) {
        console.log(error);
    }
}

async function removeProfile(profile) {
    try {
        await dbProfile.remove(profile);
    } catch (error) {
        console.log(error);
    }
}

async function fetchAllProfiles() {
    try {
        return (await dbProfile.allDocs({ include_docs: true })).rows.map(row => row.doc);
    } catch (error) {
        console.log(error);
    }
}

export { 
    makeRequest, 
    fetchRequest, 
    modifyRequest, 
    removeRequest, 
    fetchAllRequests,
    makeProfile,
    fetchProfile,
    modifyProfile,
    removeProfile,
    fetchAllProfiles 
};