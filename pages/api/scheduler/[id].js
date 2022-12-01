import { client } from "../../../lib/mongodb";
import { ObjectId } from "mongodb";
import { requireApiAuth } from "../../../utils/requireAuth";
import { getSession } from "next-auth/react";

export default async (req, res) => {
    const access = await requireApiAuth(req, res);
    if (!access) return;
    const session = await getSession({ req });

    const { id } = req.query;
    switch (req.method) {
        case "PUT":
            const data = req.body;
            const updatedTask = {
                title: data.title,
                time: data.time,
            };
            try {
                await client.connect();
                const database = client.db("taskage");
                const collection = database.collection("scheduler");
                const result = await collection.updateOne(
                    { _id: ObjectId(id), created_by: session.user.email },
                    { $set: updatedTask }
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
            res.status(201).json(updatedTask);
            break;
        case "PATCH":
            const { intervals, completed_at } = req.body;
            try {
                await client.connect();
                const db = client.db();
                const collection = db.collection("scheduler");
                const result = await collection.updateOne(
                    { _id: ObjectId(id), created_by: session.user.email },
                    { $set: { intervals, completed_at } }
                );
                console.log(
                    `${result.matchedCount} document(s) matched the query criteria.`
                );
                console.log(
                    `${result.modifiedCount} document(s) was/were updated.`
                );
            } catch (e) {
                console.error(e);
            }
            res.status(201).json({ message: "Updated todo!" });
            break;
        case "DELETE":
            try {
                await client.connect();
                const db = client.db();
                const collection = db.collection("scheduler");
                const result = await collection.deleteOne({
                    _id: ObjectId(id),
                    created_by: session.user.email,
                });
                console.log(
                    `${result.deletedCount} document(s) was/were deleted.`
                );
            } catch (e) {
                console.error(e);
            }
            res.status(200).json({ message: "Todo deleted" });
            break;
        default:
            res.status(405).json({ message: "Method not allowed" });
    }
};
