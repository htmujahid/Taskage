import { getSession } from "next-auth/react";
import { requireApiAuth } from "@/lib/api/auth";
import { deleteNote, updateNote } from "@/lib/api/db/notes";

export default async function handler(req, res) {
    const access = await requireApiAuth(req, res);
    if (!access) return;
    const session = await getSession({ req });
    const { id } = req.query;
    const data = req.body;
    switch (req.method) {
        case "PUT":
            try {
                const result = await updateNote(id, data, session);
                res.status(201).json(result);
            } catch (error) {
                res.status(500).json({ error: "Something went wrong." });
            }
            break;
        case "DELETE":
            try {
                const result = await deleteNote(id, session);
                res.status(201).json(result);
            } catch (error) {
                res.status(500).json({ error: "Something went wrong." });
            }
            break;
        default:
            res.status(405).json({ message: "Method not allowed" });
            break;
    }
}
