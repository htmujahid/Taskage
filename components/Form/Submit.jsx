import React from "react";

function Submit({ children, className, ...props }) {
    return (
        <button
            type="submit"
            className={`bg-blue-600 text-gray-100 text-sm font-medium whitespace-none block rounded-lg w-full h-11 px-4 py-2.5 hover:bg-opacity-90 duration-100 ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}

export default Submit;
