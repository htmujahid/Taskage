import React, { useEffect } from "react";
import Head from "next/head";
import Scheduler from "@/components/Scheduler/index";
import { getSession } from "next-auth/react";
import AppbarWrapper from "@/components/Appbar/AppbarWrapper";

export default function scheduler() {
    return (
        <React.Fragment>
            <Head>
                <title>Taskage - Scheduler</title>
            </Head>
            <AppbarWrapper>
                <Scheduler />
            </AppbarWrapper>
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
