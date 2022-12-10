import { getSession } from "next-auth/react";
import { requireApiAuth } from "@/lib/api/auth";
import { createHabit, getHabits } from "@/lib/api/db/habits";

export default async function handler(req, res) {
    const access = await requireApiAuth(req, res);
    if (!access) return;
    const session = await getSession({ req });
    const { method } = req;
    switch (method) {
        case "GET":
            try {
                const result = await getHabits(session);
                res.status(200).json(result);
            } catch (error) {
                res.status(500).json({ error: "Something went wrong." });
            }
            break;
        case "POST":
            const data = req.body;
            if (!data.title || !data.routine) {
                res.status(422).json({ message: "Invalid input." });
                return;
            }

            try {
                const result = await createHabit(data, session);
                res.status(201).json(result);
            } catch (e) {
                res.status(500).json({ error: "Something went wrong." });
            }
            break;
        default:
            res.setHeader("Allow", ["GET", "POST"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
