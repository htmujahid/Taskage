import React, { useEffect } from "react";
import Head from "next/head";
import Navbar from "@/components/Navbar/Navbar";
import Goal from "@/components/Goals/index";
import { getSession } from "next-auth/react";

export default function goals() {
    return (
        <React.Fragment>
            <Head>
                <title>Taskage - Goals</title>
            </Head>
            <Navbar />
            <Goal />
        </React.Fragment>
    );
}

export async function getServerSideProps(context) {
    const session = await getSession(context);
    if (!session) {
        return {
            redirect: {
                destination: "/auth/signin",
                permanent: false,
            },
            props: {},
        };
    }
    return {
        props: {},
    };
}
