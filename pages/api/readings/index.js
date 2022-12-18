import { getSession } from "next-auth/react";
import { requireApiAuth } from "@/lib/api/auth";
import { createReading, getReadings } from "@/lib/api/db/readings";

export default async function handler(req, res) {
    const access = await requireApiAuth(req, res);
    if (!access) return;
    const session = await getSession({ req });
    const { method } = req;
    switch (method) {
        case "GET":
            try {
                const readings = await getReadings(session);
                res.status(200).json(readings);
            } catch (error) {
                res.status(500).json({ error: "Something went wrong." });
            }
            break;
        case "POST":
            const data = req.body;

            if (!data.title || !data.author || !data.status) {
                res.status(422).json({ message: "Invalid input." });
                return;
            }

            try {
                const result = await createReading(data, session);
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
