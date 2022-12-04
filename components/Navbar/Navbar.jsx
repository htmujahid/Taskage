import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

function Navbar() {
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const router = useRouter();
    const path = router.pathname;

    const { data: session, status } = useSession();

    const navbarList = [
        {
            name: "Todos",
            path: "/todos",
        },
        {
            name: "Scheduler",
            path: "/scheduler",
        },
        {
            name: "Goals",
            path: "/goals",
        },
        {
            name: "Habits",
            path: "/habits",
        },
        {
            name: "Notes",
            path: "/notes",
        },
        {
            name: "Readings",
            path: "/readings",
        },
    ];

    function signoutHandler() {
        signOut();
    }

    return (
        <nav>
            <div className="border-gray-200 ">
                <div className="flex flex-wrap justify-center sm:justify-between items-center gap-4 mx-auto max-w-screen-xl px-4 md:px-6 py-2.5">
                    <Link href="/" className="flex items-center">
                        <img
                            src="/assets/icons/logo-black.svg"
                            className="h-5 mr-3 opacity-50"
                            alt="Flowbite Logo"
                        />
                    </Link>
                    {status !== "loading" && !session && (
                        <div className="flex items-center gap-4">
                            <Link
                                href="/auth/signin"
                                className="inline-block px-4 py-2 rounded-lg text-sm font-medium bg-blue-600 text-gray-100 duration-100 hover:bg-opacity-90 "
                            >
                                Get Started
                            </Link>
                        </div>
                    )}
                    {status !== "loading" && session && (
                        <div className="flex items-center gap-4 relative">
                            <h6 className="text-gray-900">
                                Hi, {session.user.name.split(" ")[0]}
                            </h6>
                            <img
                                src={session.user.image}
                                alt="image"
                                width={32}
                                height={32}
                                className="rounded-full"
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                            />
                            {isProfileOpen && (
                                <div
                                    className="z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow absolute top-6 right-0"
                                    id="user-dropdown"
                                >
                                    {/* <div className="px-4 py-3">
                                    <span className="block text-sm text-gray-900">
                                        {session.user.name}
                                        </span>
                                        <span className="block text-sm font-medium text-gray-500 truncate">
                                        {session.user.email}
                                    </span>
                                </div> */}
                                    <ul className="py-1">
                                        <li className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            <button
                                                className=""
                                                onClick={signoutHandler}
                                            >
                                                Sign Out
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <div className="border shadow">
                <div className="max-w-screen-xl px-4 py-3 mx-auto md:px-6">
                    <div className="flex items-center">
                        <ul className="flex flex-row mt-0 mr-6 space-x-8 font-medium overflow-x-auto hide-scrollbar">
                            {navbarList.map((item) => (
                                <li key={item.path}>
                                    <Link
                                        href={item.path}
                                        className={`text-gray-900 ${
                                            item.path === path
                                                ? "font-semibold"
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
