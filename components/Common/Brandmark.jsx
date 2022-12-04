import React from "react";
import Link from "next/link";
function Brandmark({ className }) {
    return (
        <div className={`w-fit mx-auto ${className}`}>
            <Link href="/">
                <img
                    src="/assets/icons/brandmark-black.svg"
                    alt="brandmark"
                    className="h-16"
                />
            </Link>
        </div>
    );
}

export default Brandmark;
