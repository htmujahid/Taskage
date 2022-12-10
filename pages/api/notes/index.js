import { getSession } from "next-auth/react";
import { requireApiAuth } from "@/lib/api/auth";
import { createNote, getNotes } from "@/lib/api/db/notes";

export default async function handler(req, res) {
    const access = await requireApiAuth(req, res);
    if (!access) return;
    const { method } = req;
    const session = await getSession({ req });
    switch (method) {
        case "GET":
            try {
                const result = await getNotes(session);
                res.status(200).json(result);
            } catch (error) {
                res.status(500).json({ error: "Something went wrong." });
            }
            break;
        case "POST":
            const data = req.body;
            if (!data.note) {
                res.status(422).json({ message: "Invalid input." });
                return;
            }

            try {
                const result = await createNote(data, session);
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
