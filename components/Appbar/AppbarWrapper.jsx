import React from "react";
import Sidebar from "@/components/Appbar/Sidebar";
import Navbar from "./Navbar";
function AppbarWrapper({ children }) {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 overflow-x-auto ">
                <Navbar />
                <div className="h-screen overflow-y-auto pb-10">{children}</div>
            </div>
        </div>
    );
}

export default AppbarWrapper;
