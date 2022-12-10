import React, { useEffect } from "react";
import Head from "next/head";
import Navbar from "@/components/Navbar/Navbar";
import Alert from "@/components/Common/Alert";
import Summary from "@/components/Summary/index";
import { getSession } from "next-auth/react";

export default function Home() {
    return (
        <React.Fragment>
            <Head>
                <title>Taskage - Home</title>
            </Head>
            <Alert />
            <Navbar />
            <Summary />
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
