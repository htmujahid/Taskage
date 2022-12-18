import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
const navList = [
    {
        name: "Todos",
        path: "/app/todos",
    },
    {
        name: "Scheduler",
        path: "/app/scheduler",
    },
    {
        name: "Goals",
        path: "/app/goals",
    },
    {
        name: "Habits",
        path: "/app/habits",
    },
    {
        name: "Notes",
        path: "/app/notes",
    },
    {
        name: "Readings",
        path: "/app/readings",
    },
];

function Navbar({ isOpen, setIsOpen }) {
    const router = useRouter();
    const path = router.pathname;

    const [navbarList, setNavbarList] = useState(navList);

    return (
        <nav className="shadow h-12">
            <div className="container mx-auto">
                <div className="px-4 py-3 md:px-6">
                    <div className="flex items-center">
                        <ul className="flex flex-row mt-0 mr-6 space-x-8 font-medium overflow-x-auto hide-scrollbar">
                            {navbarList.map((item) => (
                                <li key={item.path}>
                                    <Link
                                        href={item.path}
                                        className={`text-gray-900 ${
                                            item.path === path
                                                ? "font-semibold text-blue-600"
                                                : "hover:underline"
                                        }`}
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
