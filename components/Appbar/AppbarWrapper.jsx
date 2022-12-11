import React, { useRef } from "react";
import Sidebar from "@/components/Appbar/Sidebar";
import Navbar from "./Navbar";
function AppbarWrapper({ children }) {
    return (
        <div className="flex overflow-y-hidden h-screen">
            <Sidebar />
            <div className="flex-1">
                <Navbar />
                <div className="pb-10 h-screen overflow-y-auto ml-0 sm:ml-16">{children}</div>
            </div>
        </div>
    );
}

export default AppbarWrapper;
