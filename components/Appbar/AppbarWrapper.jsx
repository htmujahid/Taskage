import React from "react";
import Sidebar from "@/components/Appbar/Sidebar";
import Navbar from "./Navbar";
function AppbarWrapper({ children }) {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 overflow-x-scroll">
                <Navbar />
                {children}
            </div>
        </div>
    );
}

export default AppbarWrapper;
