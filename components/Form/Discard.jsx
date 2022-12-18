import React from "react";

function Discard({ children, className, setEditMode, ...props }) {
    return (
        <button
            className={`bg-gray-600 text-gray-100 text-sm font-medium rounded-lg px-4 py-2.5 hover:bg-opacity-90 duration-100 w-full ${className}`}
            onClick={() => setEditMode(false)}
            {...props}
        >
            {children}
        </button>
    );
}

export default Discard;
