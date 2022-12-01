import { getSession, useSession } from "next-auth/react";
import { signIn } from "next-auth/react";

async function requirePageAuth() {
    const session = await getSession();
    if (!session) {
        signIn();
    }
}

async function requireApiAuth(req, res) {
    const session = await getSession({ req });
    if (!session) {
        res.status(401).json({ error: "Not authenticated" });
        return false;
    }
    return true;
}

module.exports = {
    requirePageAuth,
    requireApiAuth,
};
