import { getSession } from "next-auth/react";
import { requireApiAuth } from "@/lib/api/auth";
import { createList, getLists } from "@/lib/api/db/workspace/lists";

export default async function handler(req, res) {
    const access = await requireApiAuth(req, res);
    if (!access) return;

    const session = await getSession({ req });

    switch (req.method) {
        case "GET":
            const lists = await getLists(session);
            res.status(200).json(lists);
            break;
        case "POST":
            const data = req.body;
            const newList = await createList(data, session);
            res.status(200).json(newList);
            break;

        default:
            res.status(405).end();
            break;
    }
}
