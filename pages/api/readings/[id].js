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
    switch (method) {
        case "PUT":
            // Create data in your database
            const data = req.body;
            const updatedReading = {
                title: data.title,
                author: data.author,
                type: data.type,
                status: data.status,
                start_date: data.start_date,
                end_date: data.end_date,
                created_at: new Date().toISOString(),
            };
            try {
                await client.connect();
                const database = client.db("taskage");
                const collection = database.collection("readings");
                const result = await collection.updateOne(
                    { _id: ObjectId(id), created_by: session.user.email },
                    { $set: updatedReading }
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
        case "PATCH":
            // Update data in your database
            const updateReading = {
                end_date: data.end_date,
            };
            try {
                await client.connect();
                const database = client.db("taskage");
                const collection = database.collection("readings");
                const result = await collection.updateOne(
                    { _id: ObjectId(id), created_by: session.user.email },
                    { $set: updateReading }
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
                const collection = database.collection("readings");
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
            res.setHeader("Allow", ["PUT", "DELETE", "PATCH"]);
            res.status(405).end(`Method ${method} Not Allowed`);
            break;
    }
}
