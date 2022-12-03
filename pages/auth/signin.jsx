import React from "react";
import Head from "next/head";
import SigninComponent from "../../components/Authentication/Signin";

import { useSession, getSession } from "next-auth/react";

export default function signin() {
    const { status } = useSession();

    if (status === "loading") {
        return <div>Loading...</div>;
    }
    return (
        <React.Fragment>
            <Head>
                <title>Taskage - Signin</title>
            </Head>
            <SigninComponent />
        </React.Fragment>
    );
}

export async function getServerSideProps(context) {
    const session = await getSession(context);
    if (session) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }
    return {
        props: {},
    };
}
