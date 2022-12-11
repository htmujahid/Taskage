import React, { useState } from "react";
import Sidebar from "@/components/Appbar/Sidebar";
import Navbar from "./Navbar";
function AppbarWrapper({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="flex overflow-y-hidden h-screen">
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
            <div className="flex-1">
                <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
                <div className="pb-10 h-screen overflow-y-auto w-screen">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default AppbarWrapper;
