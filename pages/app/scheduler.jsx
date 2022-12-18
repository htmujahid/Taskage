import React, { useEffect } from "react";
import Head from "next/head";
import Navbar from "@/components/Navbar/Navbar";
import Scheduler from "@/components/Scheduler/index";
import { getSession } from "next-auth/react";
import Header from "@/components/Header/Header";

export default function scheduler() {
    return (
        <React.Fragment>
            <Head>
                <title>Taskage - Scheduler</title>
            </Head>
            <Header />
            <Navbar />
            <Scheduler />
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
