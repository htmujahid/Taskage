import NextAuth from "next-auth";

import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import { client } from "../../../lib/mongodb";

import { verifyPassword } from "../../../lib/auth";
export default NextAuth({
    session: {
        jwt: true,
    },
    pages: {
        signIn: "/auth/login",
        signOut: "/auth/login",
        error: "/auth/login",
        verifyRequest: "/auth/login",
        newUser: "/auth/login",
    },
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: "Credentials",
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            async authorize(credentials, req) {
                // You need to provide your own logic here that takes the credentials
                // submitted and returns either a object representing a user or value
                // that is false/null if the credentials are invalid.
                // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
                // You can also use the `req` object to obtain additional parameters
                // (i.e., the request IP address)
                const connect = await client.connect();
                const db = connect.db();
                const users = db.collection("users");
                const user = await users.findOne({ email: credentials.email });
                if (!user) {
                    client.close();
                    throw new Error("No user found!");
                }
                const isValid = await verifyPassword(
                    credentials.password,
                    user.password
                );
                if (!isValid) {
                    client.close();
                    throw new Error("Could not log you in!");
                }
                client.close();
                return { email: user.email };
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    secret: process.env.NEXT_PUBLIC_SECRET,
});
