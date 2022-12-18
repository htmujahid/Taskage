import React from "react";
import Navbar from "@/components/Navbar/Navbar";

export default function Error404() {
    return (
        <React.Fragment>
            <Navbar />
            <p className="container mx-auto ">Error 404 Page Not Found</p>
        </React.Fragment>
    );
}
