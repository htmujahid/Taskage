import { database } from "@/lib/api/middlewares";
import { ObjectId } from "mongodb";

const COLLECTION = "lists";

export async function getLists(session) {
    const db = await database();
    const collection = await db.collection(COLLECTION);
    return await collection
        .find({
            created_by: session.user.email,
        })
        .toArray();
}

export async function createList(data, session) {
    const newList = {
        title: data.title,
        created_by: session.user.email,
        created_at: new Date().toISOString(),
    };

    const db = await database();
    const collection = await db.collection(COLLECTION);
    return await collection.insertOne(newList);
}

export async function updateList(id, data, session) {
    const { title } = data;
    const db = await database();
    const collection = await db.collection(COLLECTION);
    return await collection.updateOne(
        { _id: ObjectId(id), created_by: session.user.email },
        { $set: { title } }
    );
}

export async function deleteList(id, session) {
    const db = await database();
    const collection = await db.collection(COLLECTION);
    return await collection.deleteOne({
        _id: ObjectId(id),
        created_by: session.user.email,
    });
}
