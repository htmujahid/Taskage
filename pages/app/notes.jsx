import React, { useEffect } from "react";
import Head from "next/head";
import Navbar from "@/components/Navbar/Navbar";
import Note from "@/components/Notes/index";
import { getSession } from "next-auth/react";
import Header from "@/components/Header/Header";

export default function notes() {
    return (
        <React.Fragment>
            <Head>
                <title>Taskage - Notes</title>
            </Head>
            <Header />
            <Navbar />
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
