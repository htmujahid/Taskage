import React, { useEffect } from "react";
import { getSession } from "next-auth/react";

import Head from "next/head";
import AppbarWrapper from "@/components/Appbar/AppbarWrapper";
import ComingSoon from "@/components/Common/ComingSoon";

export default function list() {
    return (
        <React.Fragment>
            <Head>
                <title>Taskage - Home</title>
            </Head>
            {/* <Alert /> */}
            <AppbarWrapper>
                <React.Fragment>
                    <ComingSoon />
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
