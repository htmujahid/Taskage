import { database } from "@/lib/api/middlewares";
import { ObjectId } from "mongodb";

const COLLECTION = "habits";

export async function getHabits(session) {
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

export async function createHabit(data, session) {
    const newHabit = {
        title: data.title,
        routine: data.routine,
        updated_at: null,
        completed_at: null,
        created_by: session.user.email,
        created_at: new Date().toISOString(),
    };

    const db = await database();
    const collection = await db.collection(COLLECTION);

    return await collection.insertOne(newHabit);
}

export async function updateHabit(id, data, session) {
    const updatedTodo = {
        title: data.title,
        routine: data.routine,
    };

    const db = await database();
    const collection = await db.collection(COLLECTION);

    return await collection.updateOne(
        { _id: ObjectId(id), created_by: session.user.email },
        { $set: updatedTodo }
    );
}

export async function updateHabitStatus(id, data, session) {
    const updateHabit = {
        updated_at: data.updated_at,
        completed_at: data.completed_at,
    };

    const db = await database();
    const collection = await db.collection(COLLECTION);

    return await collection.updateOne(
        { _id: ObjectId(id), created_by: session.user.email },
        { $set: updateHabit }
    );
}

export async function deleteHabit(id, session) {
    const db = await database();
    const collection = await db.collection(COLLECTION);

    return await collection.deleteOne({
        _id: ObjectId(id),
        created_by: session.user.email,
    });
}

export async function countHabits(session) {
    const db = await database();
    const collection = await db.collection(COLLECTION);

    return await collection.countDocuments({
        created_by: session.user.email,
        completed_at: null,
    });
}
