import React from "react";

function Wrapper({ children, className }) {
    return (
        <div
            className={`mx-auto bg-white rounded-lg shadow-md p-6 w-[95%] max-w-[400px] relative -top-20 ${className}`}
        >
            {children}
        </div>
    );
}

export default Wrapper;
