import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
const privateNavbarList = [
    {
        name: "Todos",
        path: "/app/private/todos",
    },
    {
        name: "Scheduler",
        path: "/app/private/scheduler",
    },
    {
        name: "Goals",
        path: "/app/private/goals",
    },
    {
        name: "Habits",
        path: "/app/private/habits",
    },
    {
        name: "Notes",
        path: "/app/private/notes",
    },
    {
        name: "Readings",
        path: "/app/private/readings",
    },
];

const projectsNavbarList = [
    {
        name: "Board",
        path: "/app/projects/board",
    },
    {
        name: "Backlog",
        path: "/app/projects/backlog",
    },
    {
        name: "List",
        path: "/app/projects/list",
    },
];
function Navbar({ isOpen, setIsOpen }) {
    const router = useRouter();
    const path = router.pathname;

    const [navbarList, setNavbarList] = useState([]);

    useEffect(() => {
        if (path.includes("/app/private")) {
            setNavbarList(privateNavbarList);
        } else if (path.includes("/app/projects")) {
            setNavbarList(projectsNavbarList);
        }
    }, [path]);

    return (
        <nav
            className={`duration-300 ${
                isOpen
                    ? "ml-64 w-[calc(100vw-256px)]"
                    : "ml-16 w-[calc(100vw-64px)]"
            }`}
        >
            <div className="shadow h-12">
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
