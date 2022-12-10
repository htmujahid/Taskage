import { getSession } from "next-auth/react";
import { requireApiAuth } from "@/lib/api/auth";
import { createScheduler, getScheduler } from "@/lib/api/db/scheduler";

export default async function handler(req, res) {
    const access = requireApiAuth(req, res);
    if (!access) return;

    const session = await getSession({ req });

    switch (req.method) {
        case "GET":
            try {
                const todos = await getScheduler(session);
                res.status(200).json(todos);
            } catch (error) {
                res.status(500).json({ message: "Something went wrong." });
            }
            break;
        case "POST":
            const data = req.body;

            if (!data.title) {
                res.status(422).json({ message: "Invalid input." });
                return;
            }

            try {
                const result = await createScheduler(data, session);
                res.status(201).json(result);
            } catch (error) {
                res.status(500).json({ message: "Something went wrong." });
            }
            break;
        default:
            res.setHeader("Allow", ["GET", "POST"]);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
