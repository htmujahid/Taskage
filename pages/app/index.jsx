import React, { useEffect } from "react";
import { getSession } from "next-auth/react";

import Head from "next/head";
import Alert from "@/components/Common/Alert";
import Navbar from "@/components/Appbar/Navbar";
import Sidebar from "@/components/Appbar/Sidebar";
import Summary from "@/components/Summary/index";
import AppbarWrapper from "@/components/Appbar/AppbarWrapper";

export default function Home() {
    return (
        <React.Fragment>
            <Head>
                <title>Taskage - Home</title>
            </Head>
            {/* <Alert /> */}
            <AppbarWrapper>
                <React.Fragment>
                    <Navbar />
                    <Summary />
                </React.Fragment>
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
