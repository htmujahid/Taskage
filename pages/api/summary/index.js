import { getSession } from "next-auth/react";

import { requireApiAuth } from "@/lib/api/auth";
import { countTodos } from "@/lib/api/db/todos";
import { countScheduler } from "@/lib/api/db/scheduler";
import { countGoals } from "@/lib/api/db/goals";
import { countHabits } from "@/lib/api/db/habits";
import { countNotes } from "@/lib/api/db/notes";
import { countReadings } from "@/lib/api/db/readings";

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
                const todoCount = await countTodos(session);
                const schedulerCount = await countScheduler(session);
                const goalCount = await countGoals(session);
                const habitCount = await countHabits(session);
                const noteCount = await countNotes(session);
                const readingCount = await countReadings(session);

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
            res.setHeader("Allow", ["GET"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
