import { getSession } from "next-auth/react";
import { requireApiAuth } from "@/lib/api/auth";
import {
    deleteHabit,
    updateHabit,
    updateHabitStatus,
} from "@/lib/api/db/habits";

export default async function handler(req, res) {
    const access = await requireApiAuth(req, res);
    if (!access) return;
    const session = await getSession({ req });
    const { id } = req.query;
    const { method } = req;
    const data = req.body;
    switch (method) {
        case "PUT":
            try {
                const result = await updateHabit(id, data, session);
                res.status(201).json(result);
            } catch (e) {
                res.status(500).json({ error: "Something went wrong." });
            }
            break;

        case "PATCH":
            try {
                const result = await updateHabitStatus(id, data, session);
                res.status(201).json(result);
            } catch (e) {
                res.status(500).json({ error: "Something went wrong." });
            }
            break;

        case "DELETE":
            try {
                const result = await deleteHabit(id, session);
                res.status(201).json(result);
            } catch (e) {
                res.status(500).json({ error: "Something went wrong." });
            }
            break;

        default:
            res.setHeader("Allow", ["PUT", "PATCH", "DELETE"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
