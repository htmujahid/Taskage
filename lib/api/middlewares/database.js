import { MongoClient } from "mongodb";

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentiatlly
 * during API Route usage.
 * https://github.com/vercel/next.js/pull/17666
 */
global.mongo = global.mongo || {};
export let db;

export async function getMongoClient() {
    if (!global.mongo.client) {
        global.mongo.client = new MongoClient(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        await global.mongo.client.connect();
    }
    return global.mongo.client;
}

export default async function database() {
    const dbClient = await getMongoClient();
    if (!db) db = await dbClient.db(process.env.DB_NAME);
    return db;
}
