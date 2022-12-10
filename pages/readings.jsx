import React, { useEffect } from "react";
import Head from "next/head";
import Navbar from "@/components/Navbar/Navbar";
import Reading from "@/components/Readings/index";
import { getSession } from "next-auth/react";

export default function readings() {
    return (
        <React.Fragment>
            <Head>
                <title>Taskage - Readings</title>
            </Head>
            <Navbar />
            <Reading />
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
