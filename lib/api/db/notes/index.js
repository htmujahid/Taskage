import { database } from "@/lib/api/middlewares";
import { ObjectId } from "mongodb";

const COLLECTION = "notes";

export async function getNotes(session) {
    const db = await database();
    const collection = await db.collection(COLLECTION);

    return await collection
        .find({
            created_by: session.user.email,
        })
        .toArray();
}

export async function createNote(data, session) {
    const newNote = {
        note: data.note,
        color: data.color,
        rotate: data.rotate,
        created_by: session.user.email,
        created_at: new Date().toISOString(),
    };

    const db = await database();
    const collection = await db.collection(COLLECTION);

    return await collection.insertOne(newNote);
}

export async function updateNote(id, data, session) {
    const { note } = data;

    const db = await database();
    const collection = await db.collection(COLLECTION);

    return await collection.updateOne(
        { _id: ObjectId(id), created_by: session.user.email },
        { $set: { note } }
    );
}

export async function deleteNote(id, session) {
    const db = await database();
    const collection = await db.collection(COLLECTION);
    console.log(id);
    return await collection.deleteOne({
        _id: ObjectId(id),
        created_by: session.user.email,
    });
}

export async function countNotes(session) {
    const db = await database();
    const collection = await db.collection(COLLECTION);

    return await collection.countDocuments({
        created_by: session.user.email,
    });
}
