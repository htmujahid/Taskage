import React, { useEffect } from "react";
import { getSession } from "next-auth/react";

import Head from "next/head";
import Alert from "@/components/Common/Alert";
import Summary from "@/components/Summary/index";
import AppbarWrapper from "@/components/Appbar/AppbarWrapper";

export default function dashboard() {
    return (
        <React.Fragment>
            <Head>
                <title>Taskage - Home</title>
            </Head>
            {/* <Alert /> */}
            <AppbarWrapper>
                <Summary />
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
