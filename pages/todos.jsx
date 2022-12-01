import React, { useEffect } from "react";
import Head from "next/head";
import Navbar from "../components/Navbar/Navbar";
import Todo from "../components/Todo/index";
import { requirePageAuth } from "../utils/requireAuth";
export default function todo() {
    useEffect(() => {
        requirePageAuth();
    }, []);

    return (
        <React.Fragment>
            <Head>
                <title>Taskage - Todo</title>
            </Head>
            {/* <Navbar /> */}
            <Todo />
        </React.Fragment>
    );
}
