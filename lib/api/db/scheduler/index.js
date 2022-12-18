import { database } from "@/lib/api/middlewares";
import { ObjectId } from "mongodb";

const COLLECTION = "scheduler";

export async function getScheduler(session) {
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

export async function createScheduler(data, session) {
    const newScheduler = {
        title: data.title,
        time: data.time,
        intervals: [
            {
                started_at: new Date().toISOString(),
                completed_at: null,
            },
        ],
        completed_at: null,
        created_by: session.user.email,
        created_at: new Date().toISOString(),
    };

    const db = await database();
    const collection = await db.collection(COLLECTION);

    return await collection.insertOne(newScheduler);
}

export async function updateSchedulerStatus(id, data, session) {
    const { intervals, completed_at } = data;

    const db = await database();
    const collection = await db.collection(COLLECTION);

    return await collection.updateOne(
        { _id: ObjectId(id), created_by: session.user.email },
        { $set: { intervals, completed_at } }
    );
}

export async function updateScheduler(id, data, session) {
    const updatedTask = {
        title: data.title,
        time: data.time,
    };

    const db = await database();
    const collection = await db.collection(COLLECTION);

    return await collection.updateOne(
        { _id: ObjectId(id), created_by: session.user.email },
        { $set: updatedTask }
    );
}

export async function deleteScheduler(id, session) {
    const db = await database();
    const collection = await db.collection(COLLECTION);
    return await collection.deleteOne({
        _id: ObjectId(id),
        created_by: session.user.email,
    });
}

export async function countScheduler(session) {
    const db = await database();
    const collection = await db.collection(COLLECTION);
    return await collection.countDocuments({
        created_by: session.user.email,
        completed_at: null,
    });
}
