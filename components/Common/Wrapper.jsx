import React from "react";

function Wrapper({ children, className }) {
    return (
        <div
            className={`container-lg mx-auto bg-white rounded-lg shadow-md p-6 relative ${className}`}
        >
            {children}
        </div>
    );
}

export default Wrapper;
