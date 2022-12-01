import { client } from "../../../lib/mongodb";
import { ObjectId } from "mongodb";
import { requireApiAuth } from "../../../utils/requireAuth";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
    const access = await requireApiAuth(req, res);
    if (!access) return;
    const session = await getSession({ req });
    const { method } = req;
    switch (method) {
        case "GET":
            try {
                await client.connect();
                const database = client.db("taskage");
                const collection = database.collection("goals");
                const goals = await collection
                    .find({
                        $and: [
                            {
                                created_by: session.user.email,
                            },
                            {
                                completed_at: null,
                            },
                        ],
                    })
                    .sort({ created_at: -1 })
                    .toArray();
                res.status(200).json(goals);
            } catch (error) {
                res.status(400).json({ success: false });
            } finally {
                await client.close();
            }
            break;
        case "POST":
            const data = req.body;
            if (!data.title || !data.start_date || !data.end_date) {
                res.status(422).json({ message: "Invalid input." });
                return;
            }

            const newGoal = {
                title: data.title,
                start_date: data.start_date,
                end_date: data.end_date,
                completed_at: null,
                created_by: session.user.email,
                created_at: new Date().toISOString(),
            };
            try {
                await client.connect();
                const database = client.db("taskage");
                const collection = database.collection("goals");
                const result = await collection.insertOne(newGoal);
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
