import { getSession } from "next-auth/react";
import { requireApiAuth } from "@/lib/api/auth";

import { getTasks, createTask } from "@/lib/api/db/workspace/tasks";

export default async function handler(req, res) {
    const access = await requireApiAuth(req, res);
    if (!access) return;

    const session = await getSession({ req });

    switch (req.method) {
        case "GET":
            const tasks = await getTasks(session);
            res.status(200).json(tasks);
            break;
        case "POST":
            const data = req.body;
            const newTask = await createTask(data, session);
            res.status(200).json(newTask);
            break;

        default:
            res.status(405).end();
            break;
    }
}
