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
                <div
                    className={`pb-10 h-[calc(100vh-48px)] w-screen overflow-y-auto ml-0 duration-300 ${
                        isOpen
                            ? "sm:ml-64 sm:w-[calc(100vw-256px)]"
                            : "sm:ml-16 sm:w-[calc(100vw-64px)]"
                    }`}
                >
                    {children}
                </div>
            </div>
        </div>
    );
}

export default AppbarWrapper;
