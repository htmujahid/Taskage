import { database } from "@/lib/api/middlewares";
import { ObjectId } from "mongodb";

const COLLECTION = "todos";

export async function getTodos(session) {
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

export async function createTodo(data, session) {
    const newTodo = {
        title: data.title,
        date: new Date(data.date).toDateString(),
        description: data.description,
        category: data.category,
        priority: data.priority,
        completed_at: null,
        created_by: session.user.email,
        created_at: new Date().toISOString(),
    };

    const db = await database();
    const collection = await db.collection(COLLECTION);
    return await collection.insertOne(newTodo);
}

export async function updateTodoStatus(id, data, session) {
    const { completed_at } = data;
    const db = await database();
    const collection = await db.collection(COLLECTION);
    return await collection.updateOne(
        { _id: ObjectId(id), created_by: session.user.email },
        { $set: { completed_at: completed_at } }
    );
}

export async function updateTodo(id, data, session) {
    const updatedTodo = {
        title: data.title,
        date: new Date(data.date).toDateString(),
        description: data.description,
        category: data.category,
        priority: data.priority,
    };

    const db = await database();
    const collection = await db.collection(COLLECTION);

    return await collection.updateOne(
        { _id: ObjectId(id), created_by: session.user.email },
        { $set: updatedTodo }
    );
}

export async function deleteTodo(id, session) {
    const db = await database();
    const collection = await db.collection(COLLECTION);
    return await collection.deleteOne({
        _id: ObjectId(id),
        created_by: session.user.email,
    });
}

export async function countTodos(session) {
    const db = await database();
    const collection = await db.collection(COLLECTION);
    return await collection.countDocuments({
        created_by: session.user.email,
        completed_at: null,
    });
}
