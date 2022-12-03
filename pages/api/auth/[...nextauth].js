import NextAuth from "next-auth";

import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import EmailProvider from "next-auth/providers/email";

import { MongoDBAdapter } from "@next-auth/mongodb-adapter";

import { client } from "../../../lib/mongodb";

import { verifyPassword } from "../../../lib/auth";

export default NextAuth({
    session: {
        jwt: true,
    },
    
    pages: {
        signIn: "/auth/signin",
    },
    
    adapter: MongoDBAdapter(client.connect()),

    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        EmailProvider({
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: process.env.EMAIL_SERVER_PORT,
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD,
                },
            },
            from: "Noreply <noreplay@taskage.live",
        }),
    ],
    secret: process.env.NEXT_PUBLIC_SECRET,
});
