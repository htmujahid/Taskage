import React from "react";
import Navbar from "../../components/Header/Header";
import { getSession } from "next-auth/react";

export default function error() {
    return (
        <React.Fragment>
            <Navbar />
            <p>Something went wrong</p>
        </React.Fragment>
    );
}

export async function getServerSideProps(context) {
    const session = await getSession(context);
    if (session) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }
    return {
        props: {},
    };
}
