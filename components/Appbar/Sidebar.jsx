import React, { useEffect, useState } from "react";
import Link from "next/link";

import { useSession, signOut } from "next-auth/react";

function Sidebar({ isOpen, setIsOpen }) {
    const { data: session } = useSession();

    return (
        <React.Fragment>
            <div
                className={`py-3 px-3 rounded flex items-center absolute left-0 top-0 h-12 z-20 bg-white `}
            >
                <button
                    className="flex items-center pl-2.5 opacity-50 w-10"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <img
                        src="/assets/icons/brandmark-black.svg"
                        className="mr-3 h-6"
                        alt="Taskage Logo"
                    />
                </button>
                <span
                    className={` text-lg font-bold overflow-x-clip duration-300 ${
                        isOpen ? "w-48" : "w-0 "
                    }`}
                >
                    TASKAGE
                </span>
            </div>

            <div
                className={`absolute top-0 left-0 right-0 bottom-0 z-10 bg-white h-screen duration-300 pt-6 overflow-y-auto overflow-x-clip ${
                    isOpen
                        ? "w-64 translate-x-0 "
                        : "w-16 -translate-x-64 sm:translate-x-0"
                } sm:block`}
            >
                <div className="py-3 px-3 rounded flex h-full flex-col justify-between">
                    <ul className={`space-y-2 mt-4`}>
                        <li>
                            <Link
                                href="/app/dashboard"
                                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
                            >
                                <svg
                                    aria-hidden="true"
                                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 "
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M13 9V3h8v6ZM3 13V3h8v10Zm10 8V11h8v10ZM3 21v-6h8v6Zm2-10h4V5H5Zm10 8h4v-6h-4Zm0-12h4V5h-4ZM5 19h4v-2H5Zm4-8Zm6-4Zm0 6Zm-6 4Z" />
                                </svg>
                                <span
                                    className={`flex-1 ml-3 whitespace-nowrap ${
                                        isOpen ? "block" : "hidden"
                                    }`}
                                >
                                    Dashboard
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/app/sticky"
                                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
                            >
                                <svg
                                    aria-hidden="true"
                                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 "
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M5 19h9v-4q0-.425.288-.713Q14.575 14 15 14h4V5H5v14Zm0 2q-.825 0-1.413-.587Q3 19.825 3 19V5q0-.825.587-1.413Q4.175 3 5 3h14q.825 0 1.413.587Q21 4.175 21 5v10l-6 6Zm3-7q-.425 0-.713-.288Q7 13.425 7 13t.287-.713Q7.575 12 8 12h3q.425 0 .713.287.287.288.287.713t-.287.712Q11.425 14 11 14Zm0-4q-.425 0-.713-.288Q7 9.425 7 9t.287-.713Q7.575 8 8 8h8q.425 0 .712.287Q17 8.575 17 9t-.288.712Q16.425 10 16 10Zm-3 9V5v14Z" />
                                </svg>
                                <span
                                    className={`flex-1 ml-3 whitespace-nowrap ${
                                        isOpen ? "block" : "hidden"
                                    }`}
                                >
                                    Sticky Notes
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/app/workspace"
                                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
                            >
                                <svg
                                    aria-hidden="true"
                                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 "
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M5 11q-.825 0-1.413-.588Q3 9.825 3 9V5q0-.825.587-1.413Q4.175 3 5 3h4q.825 0 1.413.587Q11 4.175 11 5v4q0 .825-.587 1.412Q9.825 11 9 11Zm0 10q-.825 0-1.413-.587Q3 19.825 3 19v-4q0-.825.587-1.413Q4.175 13 5 13h4q.825 0 1.413.587Q11 14.175 11 15v4q0 .825-.587 1.413Q9.825 21 9 21Zm10-10q-.825 0-1.412-.588Q13 9.825 13 9V5q0-.825.588-1.413Q14.175 3 15 3h4q.825 0 1.413.587Q21 4.175 21 5v4q0 .825-.587 1.412Q19.825 11 19 11Zm0 10q-.825 0-1.412-.587Q13 19.825 13 19v-4q0-.825.588-1.413Q14.175 13 15 13h4q.825 0 1.413.587Q21 14.175 21 15v4q0 .825-.587 1.413Q19.825 21 19 21ZM5 9h4V5H5Zm10 0h4V5h-4Zm0 10h4v-4h-4ZM5 19h4v-4H5ZM15 9Zm0 6Zm-6 0Zm0-6Z" />
                                </svg>

                                <span
                                    className={`flex-1 ml-3 whitespace-nowrap ${
                                        isOpen ? "block" : "hidden"
                                    }`}
                                >
                                    Workspace
                                </span>
                            </Link>
                        </li>
                    </ul>
                    <div className="flex-1"></div>
                    <ul className="flex justify-between items-center">
                        <Link
                            href="/app/user"
                            className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
                        >
                            <img
                                src={session?.user.image}
                                alt="user image"
                                className="h-6 w-6 rounded-full"
                            />
                            <span
                                className={`flex-1 ml-3 whitespace-nowrap ${
                                    isOpen ? "block" : "hidden"
                                }`}
                            >
                                {session?.user.name}
                            </span>
                        </Link>
                        <li className={`${isOpen ? "flex" : "hidden"}`}>
                            <button
                                onClick={() => signOut()}
                                className="flex items-start p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
                            >
                                <svg
                                    aria-hidden="true"
                                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 "
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Sidebar;
