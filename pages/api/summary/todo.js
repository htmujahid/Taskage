import { client } from "../../../lib/mongodb";
import { ObjectId } from "mongodb";
import { requireApiAuth } from "../../../utils/requireAuth";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
    const access = await requireApiAuth(req, res);
    if (!access) return;
    const session = await getSession({ req });
    const { method } = req;
    switch (method) {
        case "GET":
            try {
                await client.connect();
                const database = client.db("taskage");
                const collection = database.collection("goals");
                const todoCount = await collection.countDocuments({
                    completed_at: null,
                    created_by: session.user.email,
                });
                res.status(200).json(todoCount);
            } catch (error) {
                res.status(400).json({ success: false });
            } finally {
                await client.close();
            }
            break;
        default:
            res.status(405).json({ message: "Method not allowed" });
            break;
    }
}
