import { client } from "../../../lib/mongodb";

import { requireApiAuth } from "../../../utils/requireAuth";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
    const access = await requireApiAuth(req, res);
    if (!access) {
        res.status(401).json({ error: "Not authenticated" });
        return;
    }
    const session = await getSession({ req });
    const method = req.method;

    switch (method) {
        case "GET":
            try {
                await client.connect();
                const db = client.db("taskage");
                const collection = db.collection("readings");
                const readCount = await collection.countDocuments({
                    created_by: session.user.email,
                    status: "Reading",
                });
                res.status(200).json(readCount);
            } catch (error) {
                res.status(500).json({ message: error.message });
            } finally {
                await client.close();
            }
            break;
        default:
            res.status(405).json({ message: "Method not allowed" });
            break;
    }
}
