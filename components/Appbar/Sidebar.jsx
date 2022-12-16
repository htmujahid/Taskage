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
                        <li>
                            <Link
                                href="/app/notes"
                                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
                            >
                                <svg
                                    aria-hidden="true"
                                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 "
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M9 18h6q.425 0 .713-.288Q16 17.425 16 17t-.287-.712Q15.425 16 15 16H9q-.425 0-.712.288Q8 16.575 8 17t.288.712Q8.575 18 9 18Zm0-4h6q.425 0 .713-.288Q16 13.425 16 13t-.287-.713Q15.425 12 15 12H9q-.425 0-.712.287Q8 12.575 8 13t.288.712Q8.575 14 9 14Zm-3 8q-.825 0-1.412-.587Q4 20.825 4 20V4q0-.825.588-1.413Q5.175 2 6 2h7.175q.4 0 .763.15.362.15.637.425l4.85 4.85q.275.275.425.637.15.363.15.763V20q0 .825-.587 1.413Q18.825 22 18 22Zm7-14V4H6v16h12V9h-4q-.425 0-.712-.288Q13 8.425 13 8ZM6 4v5-5 16V4Z" />
                                </svg>
                                <span
                                    className={`flex-1 ml-3 whitespace-nowrap ${
                                        isOpen ? "block" : "hidden"
                                    }`}
                                >
                                    Notes Taking
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/app/flowcharts"
                                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
                            >
                                <svg
                                    aria-hidden="true"
                                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 "
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M4 12v6V6v6Zm10 9q.425 0 .713-.288Q15 20.425 15 20t-.287-.712Q14.425 19 14 19t-.712.288Q13 19.575 13 20t.288.712Q13.575 21 14 21Zm6-10q.425 0 .712-.288Q21 10.425 21 10t-.288-.713Q20.425 9 20 9t-.712.287Q19 9.575 19 10t.288.712Q19.575 11 20 11Zm-10 0q.425 0 .713-.288Q11 10.425 11 10t-.287-.713Q10.425 9 10 9H7q-.425 0-.713.287Q6 9.575 6 10t.287.712Q6.575 11 7 11Zm0 4q.425 0 .713-.288Q11 14.425 11 14t-.287-.713Q10.425 13 10 13H7q-.425 0-.713.287Q6 13.575 6 14t.287.712Q6.575 15 7 15Zm-6 5q-.825 0-1.412-.587Q2 18.825 2 18V6q0-.825.588-1.412Q3.175 4 4 4h16q.825 0 1.413.588Q22 5.175 22 6H4v12h5v2Zm10 3q-1.25 0-2.125-.875T11 20q0-.975.562-1.75.563-.775 1.438-1.075V15q0-.425.288-.713Q13.575 14 14 14h5v-1.175q-.875-.3-1.438-1.075Q17 10.975 17 10q0-1.25.875-2.125T20 7q1.25 0 2.125.875T23 10q0 .975-.562 1.75-.563.775-1.438 1.075V15q0 .425-.288.712Q20.425 16 20 16h-5v1.175q.875.3 1.438 1.075Q17 19.025 17 20q0 1.25-.875 2.125T14 23Z" />
                                </svg>
                                <span
                                    className={`flex-1 ml-3 whitespace-nowrap ${
                                        isOpen ? "block" : "hidden"
                                    }`}
                                >
                                    Flowcharts
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/app/calendar"
                                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
                            >
                                <svg
                                    aria-hidden="true"
                                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 "
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M12 14q-.425 0-.712-.288Q11 13.425 11 13t.288-.713Q11.575 12 12 12t.713.287Q13 12.575 13 13t-.287.712Q12.425 14 12 14Zm-4 0q-.425 0-.713-.288Q7 13.425 7 13t.287-.713Q7.575 12 8 12t.713.287Q9 12.575 9 13t-.287.712Q8.425 14 8 14Zm8 0q-.425 0-.712-.288Q15 13.425 15 13t.288-.713Q15.575 12 16 12t.712.287Q17 12.575 17 13t-.288.712Q16.425 14 16 14Zm-4 4q-.425 0-.712-.288Q11 17.425 11 17t.288-.712Q11.575 16 12 16t.713.288Q13 16.575 13 17t-.287.712Q12.425 18 12 18Zm-4 0q-.425 0-.713-.288Q7 17.425 7 17t.287-.712Q7.575 16 8 16t.713.288Q9 16.575 9 17t-.287.712Q8.425 18 8 18Zm8 0q-.425 0-.712-.288Q15 17.425 15 17t.288-.712Q15.575 16 16 16t.712.288Q17 16.575 17 17t-.288.712Q16.425 18 16 18ZM5 22q-.825 0-1.413-.587Q3 20.825 3 20V6q0-.825.587-1.412Q4.175 4 5 4h1V3q0-.425.287-.713Q6.575 2 7 2t.713.287Q8 2.575 8 3v1h8V3q0-.425.288-.713Q16.575 2 17 2t.712.287Q18 2.575 18 3v1h1q.825 0 1.413.588Q21 5.175 21 6v14q0 .825-.587 1.413Q19.825 22 19 22Zm0-2h14V10H5v10ZM5 8h14V6H5Zm0 0V6v2Z" />
                                </svg>
                                <span
                                    className={`flex-1 ml-3 whitespace-nowrap ${
                                        isOpen ? "block" : "hidden"
                                    }`}
                                >
                                    Calendar
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
