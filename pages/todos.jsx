import React, { useEffect } from "react";
import Head from "next/head";
import Navbar from "@/components/Navbar/Navbar";
import Todo from "@/components/Todos/index";
import { getSession } from "next-auth/react";

export default function todo() {
    return (
        <React.Fragment>
            <Head>
                <title>Taskage - Todo</title>
            </Head>
            <Navbar />
            <Todo />
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
