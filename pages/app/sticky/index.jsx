import React, { useEffect } from "react";
import Head from "next/head";
import Note from "@/components/Notes/index";
import { getSession } from "next-auth/react";
import AppbarWrapper from "@/components/Appbar/AppbarWrapper";

export default function index() {
    return (
        <React.Fragment>
            <Head>
                <title>Taskage - Notes</title>
            </Head>
            <AppbarWrapper>
                <Note />
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
