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
            const { note } = req.body;
            try {
                await client.connect();
                const database = client.db("taskage");
                const collection = database.collection("notes");
                const result = await collection.updateOne(
                    { _id: ObjectId(id), created_by: session.user.email },
                    { $set: { note } }
                );
                res.status(200).json(result);
            } catch (error) {
                res.status(500).json({ message: error.message });
            } finally {
                await client.close();
            }
            break;
        case "DELETE":
            try {
                await client.connect();
                const database = client.db("taskage");
                const collection = database.collection("notes");
                const result = await collection.deleteOne({
                    _id: ObjectId(id),
                    created_by: session.user.email,
                });
                res.status(200).json(result);
            } catch (error) {
                res.status(500).json({ message: error.message });
            }
            break;
        default:
            res.status(405).json({ message: "Method not allowed" });
            break;
    }
}
