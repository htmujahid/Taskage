import React, { useEffect } from "react";
import Head from "next/head";
import Navbar from "@/components/Navbar/Navbar";
import Habit from "@/components/Habits/index";
import { getSession } from "next-auth/react";

export default function habits() {
    return (
        <React.Fragment>
            <Head>
                <title>Taskage - Habits</title>
            </Head>
            <Navbar />
            <Habit />
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
