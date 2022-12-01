import { client } from "../../../lib/mongodb";
import { ObjectId } from "mongodb";
import { requireApiAuth } from "../../../utils/requireAuth";
import { getSession } from "next-auth/react";
export default async function handler(req, res) {
    const access = await requireApiAuth(req, res);
    if (!access) return;
    const { method } = req;
    const session = await getSession({ req });
    switch (method) {
        case "GET":
            try {
                await client.connect();
                const database = client.db("taskage");
                const collection = database.collection("notes");
                const notes = await collection
                    .find({
                        created_by: session.user.email,
                    })
                    .toArray();
                res.status(200).json(notes);
            } catch (error) {
                res.status(400).json({ success: false });
            } finally {
                await client.close();
            }
            break;
        case "POST":
            // Create data in your database
            const data = req.body;
            if (!data.note) {
                res.status(422).json({ message: "Invalid input." });
                return;
            }

            const newNote = {
                note: data.note,
                color: data.color,
                rotate: data.rotate,
                created_by: session.user.email,
                created_at: new Date().toISOString(),
            };
            try {
                await client.connect();
                const database = client.db("taskage");
                const collection = database.collection("notes");
                const result = await collection.insertOne(newNote);
                console.log(
                    `1 document was inserted with the _id: ${result.insertedId}`
                );
                res.status(200).json({ id: result.insertedId });
            } catch (e) {
                console.error(e);
                res.status(500).json({ error: e });
            } finally {
                await client.close();
            }
            break;
        default:
            res.setHeader("Allow", ["GET", "POST"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
