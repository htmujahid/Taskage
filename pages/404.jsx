import React from "react";
import Navbar from "@/components/Navbar/Navbar";
import Header from "@/components/Header/Header";

export default function Error404() {
    return (
        <React.Fragment>
            <Header />
            <p className="container mx-auto px-6">Error 404 Page Not Found</p>
        </React.Fragment>
    );
}
