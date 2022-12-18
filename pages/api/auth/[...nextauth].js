import NextAuth from "next-auth";

import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";

export default NextAuth({
    pages: {
        signIn: "/auth/signin",
        error: "/auth/error",
    },

    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        // EmailProvider({
        //     server: {
        //         host: process.env.EMAIL_SERVER_HOST,
        //         port: process.env.EMAIL_SERVER_PORT,
        //         auth: {
        //             user: process.env.EMAIL_SERVER_USER,
        //             pass: process.env.EMAIL_SERVER_PASSWORD,
        //         },
        //     },
        //     from: "Noreply <noreplay@taskage.live",
        // }),
    ],
    // adapter: MongoDBAdapter(clientPromise),
    secret: process.env.NEXT_PUBLIC_SECRET,
});
