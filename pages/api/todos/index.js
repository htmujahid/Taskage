import { client } from "../../../lib/mongodb";
import { requireApiAuth } from "../../../utils/requireAuth";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
    const access = await requireApiAuth(req, res);
    if (!access) return;

    const session = await getSession({ req });
    switch (req.method) {
        case "GET":
            try {
                await client.connect();
                const database = client.db("taskage");
                const collection = database.collection("todos");
                const todos = await collection
                    .find({
                        $and: [
                            {
                                created_by: session.user.email,
                            },
                            {
                                $or: [
                                    { completed_at: null },
                                    {
                                        created_at: {
                                            $gte: new Date(
                                                new Date().toDateString()
                                            ).toISOString(),
                                        },
                                    },
                                ],
                            },
                        ],
                    })
                    .sort({ created_at: -1 })
                    .toArray();
                res.status(200).json(todos);
            } catch (error) {
                res.status(500).json({ message: "Something went wrong." });
            } finally {
                await client.close();
            }
            break;
        case "POST":
            const data = req.body;

            if (!data.title || !data.date) {
                res.status(422).json({ message: "Invalid input." });
                return;
            }

            const newTodo = {
                title: data.title,
                date: new Date(data.date).toDateString(),
                description: data.description,
                category: data.category,
                priority: data.priority,
                completed_at: null,
                created_by: session.user.email,
                created_at: new Date().toISOString(),
            };

            try {
                await client.connect();
                const database = client.db("taskage");
                const collection = database.collection("todos");
                const result = await collection.insertOne(newTodo);
                console.log(
                    `1 document was inserted with the _id: ${result.insertedId}`
                );
            } catch (e) {
                console.error(e);
            } finally {
                await client.close();
            }

            res.status(201).json(newTodo);
            break;
        default:
            res.setHeader("Allow", ["GET", "POST"]);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
