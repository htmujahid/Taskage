import React from "react";
import Link from "next/link";

function Footer() {
    return (
        <footer className="p-4md:p-8 lg:p-10 border">
            <div className="mx-auto container text-center">
                <Link href="/" className="flex items-center justify-center">
                    <img
                        src="/assets/icons/logo-black.svg"
                        className="h-5 mr-3 opacity-50"
                        alt="Flowbite Logo"
                    />
                </Link>

                <p className="my-6 text-gray-500">
                    Taskage is a free and open source task management tool for
                    freelancers.
                </p>
                <ul className="flex flex-wrap justify-center items-center mb-6 text-gray-900">
                    <li>
                        <Link
                            href="#"
                            className="mr-4 hover:underline md:mr-6 "
                        >
                            About
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="#"
                            className="mr-4 hover:underline md:mr-6 "
                        >
                            OpenSource
                        </Link>
                    </li>
                    <li>
                        <Link href="#" className="mr-4 hover:underline md:mr-6">
                            Contact
                        </Link>
                    </li>
                </ul>
                <span className="text-sm text-gray-500 sm:text-center">
                    © 2021-2022{" "}
                    <Link href="#" className="hover:underline">
                        Taskage™
                    </Link>
                    . All Rights Reserved.
                </span>
            </div>
        </footer>
    );
}

export default Footer;
