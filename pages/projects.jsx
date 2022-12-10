import React, { useEffect } from "react";
import Head from "next/head";
import Projects from "@/components/Header/Header";
import Note from "@/components/Projects/index";
import { getSession } from "next-auth/react";

export default function projects() {
    return (
        <React.Fragment>
            <Head>
                <title>Taskage - Notes</title>
            </Head>
            <Projects />
            <Note />
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
