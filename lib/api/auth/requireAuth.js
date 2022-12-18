import { getSession, useSession } from "next-auth/react";
import { signIn } from "next-auth/react";

export async function requireApiAuth(req, res) {
    const session = await getSession({ req });
    if (!session) {
        res.status(401).json({ error: "Not authenticated" });
        return false;
    }
    return true;
}
