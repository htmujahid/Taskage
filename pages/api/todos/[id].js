import { client } from "../../../lib/mongodb";

import { ObjectId } from "mongodb";
import { requireApiAuth } from "../../../utils/requireAuth";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
    const access = await requireApiAuth(req, res);
    if (!access) return;
    const session = await getSession({ req });
    const { id } = req.query;

    switch (req.method) {
        case "PUT":
            const data = req.body;
            const updatedTodo = {
                title: data.title,
                date: new Date(data.date).toDateString(),
                description: data.description,
                category: data.category,
                priority: data.priority,
            };
            try {
                await client.connect();
                const database = client.db("taskage");
                const collection = database.collection("todos");
                const result = await collection.updateOne(
                    { _id: ObjectId(id), created_by: session.user.email },
                    { $set: updatedTodo }
                );
                console.log(
                    `${result.matchedCount} document(s) matched the query criteria.`
                );
                console.log(
                    `${result.modifiedCount} document(s) was/were updated.`
                );
            } catch (e) {
                console.error(e);
            } finally {
                await client.close();
            }
            res.status(201).json(updatedTodo);
            break;
        case "PATCH":
            const { completed_at } = req.body;

            try {
                await client.connect();
                const database = client.db("taskage");
                const collection = database.collection("todos");
                const result = await collection.updateOne(
                    { _id: ObjectId(id), created_by: session.user.email },
                    { $set: { completed_at: completed_at } }
                );
                console.log(
                    `${result.matchedCount} document(s) matched the query criteria.`
                );
                console.log(
                    `${result.modifiedCount} document(s) was/were updated.`
                );
            } catch (e) {
                console.error(e);
            } finally {
                await client.close();
            }

            res.status(200).json({ message: "Updated todo!" });
            break;
        case "DELETE":
            try {
                await client.connect();
                const database = client.db("taskage");
                const collection = database.collection("todos");
                const result = await collection.deleteOne({
                    _id: ObjectId(id),
                    created_by: session.user.email,
                });
                console.log(`${result.deletedCount} documents were deleted.`);
            } catch (e) {
                console.error(e);
            } finally {
                await client.close();
            }
            res.status(200).json({ message: "Todo deleted" });
            break;
        default:
            res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
