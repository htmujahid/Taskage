import React, { useEffect } from "react";
import Head from "next/head";
import Goal from "@/components/Goals/index";
import { getSession } from "next-auth/react";
import AppbarWrapper from "@/components/Appbar/AppbarWrapper";

export default function goals() {
    return (
        <React.Fragment>
            <Head>
                <title>Taskage - Goals</title>
            </Head>
            <AppbarWrapper>
                <Goal />
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
