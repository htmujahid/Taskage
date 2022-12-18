import { getSession } from "next-auth/react";
import { requireApiAuth } from "@/lib/api/auth";
import { deleteTodo, updateTodo, updateTodoStatus } from "@/lib/api/db/todos";

export default async function handler(req, res) {
    const access = await requireApiAuth(req, res);
    if (!access) return;
    const session = await getSession({ req });
    const { id } = req.query;

    const data = req.body;
    switch (req.method) {
        case "PUT":
            try {
                const result = await updateTodo(id, data, session);
                res.status(201).json(result);
            } catch (e) {
                res.status(500).json({ message: "Something went wrong." });
            }
            break;
        case "PATCH":
            try {
                const result = await updateTodoStatus(id, data, session);
                res.status(201).json(result);
            } catch (e) {
                res.status(500).json({ message: "Something went wrong." });
            }

            break;
        case "DELETE":
            try {
                const result = await deleteTodo(id, session);
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
