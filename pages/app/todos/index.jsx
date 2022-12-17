import React, { useEffect } from "react";
import Head from "next/head";
import Todo from "@/components/Todos/index";
import { getSession } from "next-auth/react";
import AppbarWrapper from "@/components/Appbar/AppbarWrapper";

export default function todo() {
    return (
        <React.Fragment>
            <Head>
                <title>Taskage - Todo</title>
            </Head>
            <AppbarWrapper>
                <Todo />
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
