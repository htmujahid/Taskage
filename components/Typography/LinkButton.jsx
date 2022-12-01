import React from "react";
import Link from "next/link";

function LinkButton({ className, children, ...props }) {
    return (
        <Link
            className={`text-sm font-medium text-blue-600 hover:underline mb-3 ${className}`}
            {...props}
        >
            {children}
        </Link>
    );
}

export default LinkButton;
