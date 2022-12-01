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
            const updatedTodo = {
                title: data.title,
                routine: data.routine,
            };
            try {
                await client.connect();
                const database = client.db("taskage");
                const collection = database.collection("habits");
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
            const updateHabit = {
                updated_at: data.updated_at,
                completed_at: data.completed_at,
            };
            try {
                await client.connect();
                const database = client.db("taskage");
                const collection = database.collection("habits");
                const result = await collection.updateOne(
                    { _id: ObjectId(id), created_by: session.user.email },
                    { $set: updateHabit }
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
            try {
                await client.connect();
                const database = client.db("taskage");
                const collection = database.collection("habits");
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
