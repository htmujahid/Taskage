import React from "react";
import Navbar from "@/components/Header/Header";
export default function Error({ statusCode }) {
    return (
        <React.Fragment>
            <Navbar />
            <p>
                {statusCode
                    ? `An error ${statusCode} occurred on server`
                    : "An error occurred on client"}
            </p>
        </React.Fragment>
    );
}

Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode };
};
