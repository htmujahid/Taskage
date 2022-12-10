import { database } from "@/lib/api/middlewares";
import { ObjectId } from "mongodb";

const COLLECTION = "readings";

export async function getReadings(session) {
    const db = await database();
    const collection = await db.collection(COLLECTION);
    return await collection
        .find({
            created_by: session.user.email,
        })
        .sort({ created_at: -1 })
        .toArray();
}

export async function createReading(data, session) {
    const db = await database();
    const collection = await db.collection(COLLECTION);

    const newReading = {
        title: data.title,
        author: data.author,
        type: data.type,
        start_date: data.start_date,
        end_date: data.end_date,
        status: data.status,
        color: data.color,
        created_by: session.user.email,
        created_at: new Date().toISOString(),
    };

    return await collection.insertOne(newReading);
}

export async function updateReadingStatus(id, data, session) {
    const updateReading = {
        end_date: data.end_date,
    };

    const db = await database();
    const collection = await db.collection(COLLECTION);

    return await collection.updateOne(
        { _id: ObjectId(id), created_by: session.user.email },
        { $set: updateReading }
    );
}

export async function updateReading(id, data, session) {
    const updatedReading = {
        title: data.title,
        author: data.author,
        type: data.type,
        status: data.status,
        start_date: data.start_date,
        end_date: data.end_date,
        created_at: new Date().toISOString(),
    };

    const db = await database();
    const collection = await db.collection(COLLECTION);

    return await collection.updateOne(
        { _id: ObjectId(id), created_by: session.user.email },
        { $set: updatedReading }
    );
}

export async function deleteReading(id, session) {
    const db = await database();
    const collection = await db.collection(COLLECTION);

    return await collection.deleteOne({
        _id: ObjectId(id),
        created_by: session.user.email,
    });
}

export async function countReadings(session) {
    const db = await database();
    const collection = await db.collection(COLLECTION);

    return await collection.countDocuments({
        created_by: session.user.email,
    });
}
