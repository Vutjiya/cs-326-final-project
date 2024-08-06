// TODO: write documentation
import PouchDB from "pouchdb";

const db = new PouchDB("requests");

async function makeRequest(request, id) {
    console.log("db creating!");
    try {
        await db.put({_id: id, ...request });
    } catch (error) {
        console.log(error);
    }
}
// TODO: put id/datetime of request in documentation
async function fetchRequest(id) {
    try {
        return await db.get(id);
    } catch (error) {
        console.log(error);
    }
}

async function modifyRequest(request) {
    try {
        await db.put(request)
    } catch (error) {
        console.log(error);
    }
}

async function removeRequest(request) {
    try {
        await db.remove(request)
    } catch (error) {
        console.log(error);
    }
}

async function fetchAllRequests() {
    try {
        const result = await db.allDocs({ include_docs: true });
        return result.rows.map((row) => row.doc);
    } catch (error) {
        console.log(error);
    }
}

export { makeRequest, fetchRequest, 
        modifyRequest, removeRequest, 
        fetchAllRequests };