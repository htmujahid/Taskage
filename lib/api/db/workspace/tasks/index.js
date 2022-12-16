import { database } from "@/lib/api/middlewares";
import { ObjectId } from "mongodb";

const COLLECTION = "tasks";

export async function getTasks(session) {
    const db = await database();
    const collection = await db.collection(COLLECTION);
    return await collection
        .find({
            $and: [
                {
                    created_by: session.user.email,
                },
                {
                    $or: [
                        { completed_at: null },
                        {
                            created_at: {
                                $gte: new Date(
                                    new Date().toDateString()
                                ).toISOString(),
                            },
                        },
                    ],
                },
            ],
        })
        .sort({ created_at: -1 })
        .toArray();
}

export async function createTask(data, session) {
    const newTask = {
        title: data.title,
        description: data.description,
        date: new Date(data.date).toISOString(),
        list_id: data.list_id,
        created_by: session.user.email,
        created_at: new Date().toISOString(),
    };

    const db = await database();
    const collection = await db.collection(COLLECTION);
    return await collection.insertOne(newTask);
}

export async function updateTask(id, data, session) {
    const { title, description, date } = data;
    const db = await database();
    const collection = await db.collection(COLLECTION);
    return await collection.updateOne(
        { _id: ObjectId(id), created_by: session.user.email },
        { $set: { title, description, date } }
    );
}

export async function updateTaskList(id, data, session) {
    const { list_id } = data;
    const db = await database();
    const collection = await db.collection(COLLECTION);
    return await collection.updateOne(
        { _id: ObjectId(id), created_by: session.user.email },
        { $set: { list_id } }
    );
}

export async function updateTaskStatus(id, data, session) {
    const { completed_at } = data;
    const db = await database();
    const collection = await db.collection(COLLECTION);
    return await collection.updateOne(
        { _id: ObjectId(id), created_by: session.user.email },
        { $set: { completed_at: completed_at } }
    );
}

export async function deleteTask(id, session) {
    const db = await database();
    const collection = await db.collection(COLLECTION);
    return await collection.deleteOne({
        _id: ObjectId(id),
        created_by: session.user.email,
    });
}
