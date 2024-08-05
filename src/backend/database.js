// TODO: write documentation
import PouchDB from "pouchdb";

const db = new PouchDB("requests");

export async function makeRequest(request, datetime) {
    console.log("db creating!");
    try {
        await db.put({_id: datetime, ...request });
    } catch (error) {
        console.log(error);
    }
}
// TODO: put id/datetime of request in documentation
export async function fetchRequest(id) {
    try {
        return await db.get(id);
    } catch (error) {
        console.log(error);
    }
}

export async function modifyRequest(request) {
    try {
        await db.put(request)
    } catch (error) {
        console.log(error);
    }
}

export async function removeRequest(request) {
    try {
        await db.remove(request)
    } catch (error) {
        console.log(error);
    }
}