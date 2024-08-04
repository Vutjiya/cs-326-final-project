import PouchDB from "pouchdb";

const db = new PouchDB("requests");

db.get()