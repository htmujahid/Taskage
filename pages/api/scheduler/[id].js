import { getSession } from "next-auth/react";
import { requireApiAuth } from "@/lib/api/auth";
import {
    deleteScheduler,
    updateScheduler,
    updateSchedulerStatus,
} from "@/lib/api/db/scheduler";

export default async (req, res) => {
    const access = await requireApiAuth(req, res);
    if (!access) return;
    const session = await getSession({ req });

    const { id } = req.query;
    const data = req.body;

    switch (req.method) {
        case "PUT":
            try {
                const result = await updateScheduler(id, data, session);
                res.status(200).json(result);
            } catch (e) {
                res.status(500).json({ message: "Something went wrong." });
            }
            break;
        case "PATCH":
            try {
                const result = await updateSchedulerStatus(id, data, session);
                res.status(200).json(result);
            } catch (e) {
                res.status(500).json({ message: "Something went wrong." });
            }
            break;
        case "DELETE":
            try {
                const result = await deleteScheduler(id, session);
                res.status(200).json(result);
            } catch (e) {
                res.status(500).json({ message: "Something went wrong." });
            }
            break;
        default:
            res.status(405).json({ message: "Method not allowed" });
    }
};
