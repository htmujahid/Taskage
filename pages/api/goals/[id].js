import { client } from "../../../lib/mongodb";

import { ObjectId } from "mongodb";
import { requireApiAuth } from "../../../utils/requireAuth";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
    const access = await requireApiAuth(req, res);
    if (!access) return;
    const session = await getSession({ req });
    const { id } = req.query;
    const { method } = req;
    const data = req.body;
    switch (method) {
        case "PUT":
            const newGoal = {
                title: data.title,
                start_date: data.start_date,
                end_date: data.end_date,
            };
            try {
                await client.connect();
                const database = client.db("taskage");
                const collection = database.collection("goals");
                const result = await collection.updateOne(
                    { _id: ObjectId(id), created_by: session.user.email },
                    { $set: newGoal }
                );
                console.log(
                    `1 document was inserted with the _id: ${result.insertedId}`
                );
                res.status(200).json({ id: result.insertedId });
            } catch (e) {
                console.error(e);
                res.status(500).json({ error: e });
            } finally {
                await client.close();
            }
            break;
        case "PATCH":
            const updateGoal = {
                completed_at: data.completed_at,
            };
            try {
                await client.connect();
                const database = client.db("taskage");
                const collection = database.collection("goals");
                const result = await collection.updateOne(
                    { _id: ObjectId(id), created_by: session.user.email },
                    { $set: updateGoal }
                );
                console.log(
                    `${result.matchedCount} document(s) matched the query criteria.`
                );
                console.log(
                    `${result.modifiedCount} document(s) was/were updated.`
                );
                res.status(200).json({ id: result.insertedId });
            } catch (e) {
                console.error(e);
                res.status(500).json({ error: e });
            } finally {
                await client.close();
            }
            break;
        case "DELETE":
            // Delete data in your database
            try {
                await client.connect();
                const database = client.db("taskage");
                const collection = database.collection("goals");
                const result = await collection.deleteOne({
                    _id: ObjectId(id),
                    created_by: session.user.email,
                });
                console.log(
                    `${result.deletedCount} document(s) was/were deleted.`
                );
                res.status(200).json({ id: result.insertedId });
            } catch (e) {
                console.error(e);
                res.status(500).json({ error: e });
            } finally {
                await client.close();
            }
            break;
        default:
            res.setHeader("Allow", ["PUT", "PATCH", "DELETE"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
