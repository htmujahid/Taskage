const { MongoClient } = require("mongodb");
const uri = process.env.MONGODB_URI;

if (!process.env.MONGODB_URI) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const client = new MongoClient(uri);

const clientPromise = client.connect();

export { client, clientPromise };
