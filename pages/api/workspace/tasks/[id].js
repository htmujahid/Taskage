import { getSession } from "next-auth/react";
import { requireApiAuth } from "@/lib/api/auth";
import {
    deleteTask,
    updateTask,
    updateTaskList,
    updateTaskStatus,
} from "@/lib/api/db/workspace/tasks";

export default async function handler(req, res) {
    const access = await requireApiAuth(req, res);
    if (!access) return;
    const session = await getSession({ req });
    const { id } = req.query;

    const data = req.body;
    switch (req.method) {
        case "PUT":
            try {
                const result = await updateTask(id, data, session);
                res.status(201).json(result);
            } catch (e) {
                console.log(e);
                res.status(500).json({ message: "Something went wrong." });
            }
            break;
        case "PATCH":
            try {
                let result;
                if (data.completed_at) {
                    result = await updateTaskStatus(id, data, session);
                } else if (data.list_id) {
                    result = await updateTaskList(id, data, session);
                }
                res.status(201).json(result);
            } catch (e) {
                console.log(e);
                res.status(500).json({ message: "Something went wrong." });
            }

            break;
        case "DELETE":
            try {
                const result = await deleteTask(id, session);
                res.status(201).json(result);
            } catch (e) {
                res.status(500).json({ message: "Something went wrong." });
            }
            break;
        default:
            res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
