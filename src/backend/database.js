// TODO: write documentation
import PouchDB from "pouchdb";

const db = new PouchDB("requests");

async function makeRequest(id, request) {
    try {
        await db.put({_id: id, ...request });
    } catch (error) {
        console.log(error);
    }
}

async function fetchRequest(request) {
    try {
        return await db.get(request._id);
    } catch (error) {
        console.log(error);
    }
}

async function modifyRequest(oldRequest, newRequest) {
    try {
        await db.put({ _id: oldRequest._id, _rev: oldRequest._rev, ...newRequest });
    } catch (error) {
        console.log(error);
    }
}

async function removeRequest(request) {
    try {
        await db.remove(request);
    } catch (error) {
        console.log(error);
    }
}

async function fetchAllRequests() {
    try {
        return (await db.allDocs({ include_docs: true })).rows.map(row => row.doc);
    } catch (error) {
        console.log(error);
    }
}

export { 
    makeRequest, fetchRequest, 
    modifyRequest, removeRequest, 
    fetchAllRequests 
};