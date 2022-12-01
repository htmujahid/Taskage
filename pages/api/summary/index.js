import { client } from "../../../lib/mongodb";

import { requireApiAuth } from "../../../utils/requireAuth";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
    const access = await requireApiAuth(req, res);
    if (!access) {
        return;
    }
    const session = await getSession({ req });
    const method = req.method;
    switch (method) {
        case "GET":
            try {
                await client.connect();
                const db = client.db("taskage");
                const todoCollection = db.collection("goals");
                const todoCount = await todoCollection.countDocuments({
                    created_by: session.user.email,
                    completed_at: null,
                });
                const schedulerCollection = db.collection("scheduler");
                const schedulerCount = await schedulerCollection.countDocuments(
                    {
                        created_by: session.user.email,
                        completed_at: null,
                    }
                );
                const goalCollection = db.collection("goals");
                const goalCount = await goalCollection.countDocuments({
                    created_by: session.user.email,
                    completed_at: null,
                });
                const habitCollection = db.collection("habits");
                const habitCount = await habitCollection.countDocuments({
                    created_by: session.user.email,
                    completed_at: null,
                });
                const noteCollection = db.collection("notes");
                const noteCount = await noteCollection.countDocuments({
                    created_by: session.user.email,
                });
                const readingCollection = db.collection("readings");
                const readingCount = await readingCollection.countDocuments({
                    created_by: session.user.email,
                    status: "Reading",
                });
                const summary = {
                    todoCount,
                    schedulerCount,
                    goalCount,
                    habitCount,
                    noteCount,
                    readingCount,
                };
                res.status(200).json(summary);
            } catch (error) {
                res.status(500).json({ message: error.message });
            }
            break;
        default:
            res.status(405).json({ message: "Method not allowed" });
            break;
    }
}
