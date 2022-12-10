import { getSession } from "next-auth/react";
import { requireApiAuth } from "@/lib/api/auth";
import {
    deleteReading,
    updateReading,
    updateReadingStatus,
} from "@/lib/api/db/readings";

export default async function handler(req, res) {
    const access = await requireApiAuth(req, res);
    if (!access) return;
    const session = await getSession({ req });
    const { id } = req.query;
    const { method } = req;
    const data = req.body;
    switch (method) {
        case "PUT":
            // Create data in your database
            try {
                const result = await updateReading(id, data, session);
                res.status(201).json(result);
            } catch (e) {
                res.status(500).json({ error: "Something went wrong." });
            }
            break;
        case "PATCH":
            // Update data in your database
            try {
                const result = await updateReadingStatus(id, data, session);
                res.status(201).json(result);
            } catch (e) {
                res.status(500).json({ error: "Something went wrong." });
            }
            break;
        case "DELETE":
            // Delete data in your database
            try {
                const result = await deleteReading(id, session);
                res.status(201).json(result);
            } catch (e) {
                res.status(500).json({ error: "Something went wrong." });
            }
            break;
        default:
            res.setHeader("Allow", ["PUT", "DELETE", "PATCH"]);
            res.status(405).end(`Method ${method} Not Allowed`);
            break;
    }
}
