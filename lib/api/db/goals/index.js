import { database } from "@/lib/api/middlewares";
import { ObjectId } from "mongodb";

const COLLECTION = "goals";

export async function getGoals(session) {
    const db = await database();
    const collection = await db.collection(COLLECTION);

    return await collection
        .find({
            $and: [
                {
                    created_by: session.user.email,
                },
                {
                    completed_at: null,
                },
            ],
        })
        .sort({ created_at: -1 })
        .toArray();
}

export async function createGoal(data, session) {
    const newGoal = {
        title: data.title,
        start_date: data.start_date,
        end_date: data.end_date,
        completed_at: null,
        created_by: session.user.email,
        created_at: new Date().toISOString(),
    };

    const db = await database();
    const collection = await db.collection(COLLECTION);

    return await collection.insertOne(newGoal);
}

export async function updateGoal(id, data, session) {
    const newGoal = {
        title: data.title,
        start_date: data.start_date,
        end_date: data.end_date,
    };

    const db = await database();
    const collection = await db.collection(COLLECTION);

    return await collection.updateOne(
        { _id: ObjectId(id), created_by: session.user.email },
        { $set: newGoal }
    );
}

export async function updateGoalStatus(id, data, session) {
    const updateGoal = {
        completed_at: data.completed_at,
    };

    const db = await database();
    const collection = await db.collection(COLLECTION);

    return await collection.updateOne(
        { _id: ObjectId(id), created_by: session.user.email },
        { $set: updateGoal }
    );
}

export async function deleteGoal(id, session) {
    const db = await database();
    const collection = await db.collection(COLLECTION);

    return await collection.deleteOne({
        _id: ObjectId(id),
        created_by: session.user.email,
    });
}

export async function countGoals(session) {
    const db = await database();
    const collection = await db.collection(COLLECTION);

    return await collection.countDocuments({
        created_by: session.user.email,
        completed_at: null,
    });
}
