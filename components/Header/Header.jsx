import React, { useEffect, useState } from "react";
import Link from "next/link";

import { useSession, signOut } from "next-auth/react";

import { useRouter } from "next/router";

function Header() {
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const router = useRouter();

    const path = router.pathname;

    const [homePage, setHomePage] = useState("/app");

    useEffect(() => {
        if (path.includes("app")) {
            setHomePage("/app");
        } else {
            setHomePage("/");
        }
    }, [path]);

    const { data: session, status } = useSession();

    function signoutHandler() {
        signOut();
    }

    return (
        <header className="border">
            <div className="flex flex-wrap justify-center sm:justify-between items-center gap-4 mx-auto container px-4 md:px-6 py-2.5 ">
                <Link href={homePage} className="flex items-center">
                    <img
                        src="/assets/icons/logo-black.svg"
                        className="h-5 mr-3 opacity-50"
                        alt="Taskage Logo"
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
                                <div className="">
                                    {/* <span className="block text-sm text-gray-900 whitespace-none w-max">
                                        {session.user.name}
                                    </span> */}
                                    <Link
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-max"
                                        href="/app"
                                    >
                                        APP (Taskage)
                                    </Link>
                                </div>
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
        </header>
    );
}

export default Header;
