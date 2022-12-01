import React, { useEffect } from "react";
import Head from "next/head";
import Navbar from "../components/Navbar/Navbar";
import Alert from "../components/Common/Alert";
import Summary from "../components/Summary/index";
import { requirePageAuth } from "../utils/requireAuth";
export default function Home() {
    useEffect(() => {
        requirePageAuth();
    }, []);
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
