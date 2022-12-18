import { getSession } from "next-auth/react";
import { requireApiAuth } from "@/lib/api/auth";
import { createGoal, getGoals } from "@/lib/api/db/goals";

export default async function handler(req, res) {
    const access = await requireApiAuth(req, res);
    if (!access) return;
    const session = await getSession({ req });
    const { method } = req;
    switch (method) {
        case "GET":
            try {
                const result = await getGoals(session);
                res.status(200).json(result);
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case "POST":
            const data = req.body;
            if (!data.title || !data.start_date || !data.end_date) {
                res.status(422).json({ message: "Invalid input." });
                return;
            }

            try {
                const result = await createGoal(data, session);
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
